import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  @ViewChild('incomeAmount',{static: false}) incomeAmount: ElementRef;
  constructor(private _formBuilder: FormBuilder, private _yFormBuilder: FormBuilder){ }

  monthlyExpensesForm: FormGroup;
  yearlyExpensesForm: FormGroup;

  income : number;
  monthlyDue;
  yearlyDue;
  saves;
  ready : boolean = false;


  ngOnInit() {
    this.monthlyExpensesForm = this._formBuilder.group({
      monthlyExpenses: this._formBuilder.array([this._formBuilder.group({meExpenseName: '', meExpenseAmount: ''})])
    });

    this.yearlyExpensesForm = this._formBuilder.group({
      yearlyExpenses: this._yFormBuilder.array([this._formBuilder.group({yeExpenseName: '', yeExpenseAmount: ''})])
    });
  }

  

  get monthlyExpenses() {
    return this.monthlyExpensesForm.get('monthlyExpenses') as FormArray;
  }

  get yearlyExpenses() {
    return this.yearlyExpensesForm.get('yearlyExpenses') as FormArray;
  }

  addMonthlyExpense() {
    this.monthlyExpenses.push(this._formBuilder.group({meExpenseName: '', meExpenseAmount: ''}));
  }

  addYearlyExpense() {
    this.yearlyExpenses.push(this._formBuilder.group({yeExpenseName: '', yeExpenseAmount: ''}));
  }

  deleteMonthlyExpense(index) {
    this.monthlyExpenses.removeAt(index);
  }

  deleteYearlyExpense(index) {
    this.yearlyExpenses.removeAt(index);
  }

  formatJson(type) {
    let res = {
      name: '',
      typeCaracteristics: {}
    };
    for (let i = 0; i < type.typeCaracteristics.length; i++) {
      const tmpName = type.typeCaracteristics[i].caracName;
      const tmpValue = type.typeCaracteristics[i].caracValue;
      const caracTemp: {[k: string]: any} = {[tmpName]: tmpValue}
      res.typeCaracteristics[tmpName] = tmpValue;
    }
    res.name = type.name;
    return res;
  }

  Calculate(mExpenses, yExpenses) {
    let incomeAmount = this.incomeAmount.nativeElement.value;
    let mSum = 0;
    let ySum = 0;
    console.log("Before the loops " );
    for (let i = 0; i < mExpenses.monthlyExpenses.length ; i++) {
      console.log("TEST"+ mExpenses.monthlyExpenses[i].meExpenseAmount);
      mSum += +mExpenses.monthlyExpenses[i].meExpenseAmount;
    }

    console.log("between the loops");
    for (let i = 0; i < yExpenses.yearlyExpenses.length ; i++) {
      ySum += +yExpenses.yearlyExpenses[i].yeExpenseAmount;
    }

    let ySumPerMonth = ySum/12;
    console.log("monthly incomes : " + incomeAmount);
    console.log("monthly due : " + mSum);
    console.log("yearly to month due : " + ySumPerMonth);
    this.income = incomeAmount;
    this.monthlyDue = mSum;
    this.yearlyDue = ySumPerMonth;
    this.saves = this.income - mSum - ySumPerMonth;
    
  }

}
