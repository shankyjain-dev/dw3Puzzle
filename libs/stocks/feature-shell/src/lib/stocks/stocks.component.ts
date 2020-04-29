import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StocksConstant } from '../stocks.constant';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';


@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  error: string;

  quotes$ = this.priceQuery.priceQueries$;

  timePeriods = StocksConstant.timePeriods;

  destroySubject$: Subject<void> = new Subject();

  formLabels = StocksConstant.formLabels;

  constructor(private fb: FormBuilder, public priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.stockPickerForm.valueChanges.pipe(
      debounceTime(StocksConstant.DEBOUNCE_TIME),
      takeUntil(this.destroySubject$)
    )
      .subscribe(values => {
        this.fetchQuote(values);
      },
        (error) => {
          this.error = 'An error occurred:' + error;
        });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(); // destroySubject$ is emitted to kill all subscriptions.
    this.destroySubject$.complete(); // notifies observers that destroySubject$ has completed
  }

  fetchQuote(values) {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = values;
      this.priceQuery.fetchQuote(symbol, period);
    }
  }
}
