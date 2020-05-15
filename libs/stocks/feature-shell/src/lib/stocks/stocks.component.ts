import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StocksConstant } from '../stocks.constant';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy{
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  maxDate: Date;
  startDate: Date;
  endDate: Date;
  error: String;

  quotes$ = this.priceQuery.priceQueries$;

  formLabels = StocksConstant.formLabels;

  destroySubject$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}
    
  ngOnInit(): void {
    this.maxDate = new Date();
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });

    this.stockPickerForm.valueChanges.pipe(
      takeUntil(this.destroySubject$)
    )
      .subscribe(value => {
        const { startDate, endDate } = value;
        if (endDate != null && endDate < startDate){    
          this.stockPickerForm.patchValue({startDate : new Date(endDate)});
        }},
        (error) => {
          this.error = 'An error occurred:' + error;
        });
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(); // destroySubject$ is emitted to kill all subscriptions.
    this.destroySubject$.complete(); // notifies observers that destroySubject$ has completed
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, startDate, endDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, "max", new Date(startDate), new Date(endDate) );
    }
  }
}
