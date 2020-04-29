export class StocksConstant {
    public static timePeriods = [
      { viewValue: 'All available data', value: 'max' },
      { viewValue: 'Five years', value: '5y' },
      { viewValue: 'Two years', value: '2y' },
      { viewValue: 'One year', value: '1y' },
      { viewValue: 'Year-to-date', value: 'ytd' },
      { viewValue: 'Six months', value: '6m' },
      { viewValue: 'Three months', value: '3m' },
      { viewValue: 'One month', value: '1m' }
    ]
	
	public static formLabels = {
      symbolLabel: 'Stock symbol',
      symbolPlaceHolder: 'Symbol e.g AAPL',
      symbolError: 'Please enter a symbol',
      timePeriodLabel: 'Favorite time period',
      timePeriodError: 'Please select a Time Period'
    }
}