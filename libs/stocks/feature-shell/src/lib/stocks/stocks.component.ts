import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { Subscription } from 'rxjs';
import { StocksConstant } from '../stocks.constant';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  period: string;
  maxDate: Date;
  startDate: Date;
  endDate: Date;
  subscription: Subscription;

  quotes$ = this.priceQuery.priceQueries$;

  formLabels = StocksConstant.formLabels;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {}
    
  ngOnInit() {
    this.maxDate = new Date();
    this.stockPickerForm = this.fb.group({
      symbol: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required]
    });
    //if date range is invalid startDate will be same as endDate.
    this.subscription = this.stockPickerForm.valueChanges.subscribe(value => {
      const { startDate, endDate } = value;
      if (endDate != null && endDate < startDate){    
        this.stockPickerForm.patchValue({startDate : new Date(endDate)});
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, startDate, endDate } = this.stockPickerForm.value;
      this.priceQuery.fetchQuote(symbol, "max", new Date(startDate), new Date(endDate) );
    }
  }
}
