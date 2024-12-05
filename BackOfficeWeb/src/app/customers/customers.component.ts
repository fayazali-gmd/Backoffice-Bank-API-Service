import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  standalone: false,
})
export class CustomersComponent implements OnInit {
  customers :any= [];
  displayedColumns: string[] = ['customerNumber','name', 'dateofBirth', 'gender'];
  constructor(private customerService: CustomerService,private router: Router) {}

  ngOnInit() {
    this.customerService.getAll().subscribe((data : any) => {
      this.customers = data;
    });
  }
  openAddCustomerDialog(){
    this.router.navigate(['/customer','']);
  }
}
