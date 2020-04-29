import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksComponent } from './stocks.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StocksConstant } from '../stocks.constant';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let priceQueryFacade: PriceQueryFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedUiChartModule,
        StoreModule.forRoot({}),
        BrowserAnimationsModule
      ],
      providers: [PriceQueryFacade]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    priceQueryFacade = fixture.debugElement.injector.get(PriceQueryFacade);
  });

  describe('ngOnInit()', () => {
    it('should create StocksComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should call fetchQuote() on change in values of stockPrickerForm form control without custom date', () => {

      spyOn(priceQueryFacade, 'fetchQuote').and.stub();

      component.ngOnInit();
      component.stockPickerForm.setValue(StocksConstant.sampleFormValues);

      setTimeout(() => expect(priceQueryFacade.fetchQuote).toHaveBeenCalledTimes(1), 3000)
      expect(component.stockPickerForm.value).toEqual(StocksConstant.sampleFormValues);
    });
  });
});
