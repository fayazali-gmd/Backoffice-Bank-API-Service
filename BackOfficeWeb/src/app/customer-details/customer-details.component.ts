import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  standalone: false,
})

export class CustomerDetailsComponent implements OnInit {
  @Input() customerId!: number; // Input property for customer ID
  customerForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.customerForm = this.fb.group({
      CustomerNumber: [{ value: '' }],
      CustomerName: ['', Validators.required],
      DateOfBirth: ['', [Validators.required]],
      Gender: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params : any) => {
      this.customerId = +params['id'];
    });
    if (this.customerId >0) {
      this.loadCustomerDetails();
    }
  }

  /**
   * Load the customer details based on the customerId.
   */
  loadCustomerDetails(): void {
    this.customerService.getAll().subscribe((customers :any) => {
      const customer :any = customers[this.customerId];
      if (customer) {
        this.customerForm.patchValue(
          {
            CustomerNumber:customer['customerNumber'],
            CustomerName:customer['customerName'],
            DateOfBirth: customer['dateOfBirth'],
            Gender: customer['gender'],
          });
        this.isEditMode = true;
      }
    });
  }

  /**
   * Enable edit mode for updating customer details.
   */
  SaveEditDetails(): void {
    if (this.customerForm.valid) {
      const updatedCustomer = this.customerForm.getRawValue();
      this.customerService
        .updateCustomer(this.customerId, updatedCustomer)
        .subscribe(() => {
          this.isEditMode = false;
          this.toastr.success('Customer details loaded successfully!', 'Success');
          this.router.navigate(['/customers']);

        });
    }
  }

  /**
   * Save the updated customer details.
   */
  saveCustomerDetails(): void {
    if (this.customerForm.valid) {
      this.customerForm.controls['CustomerNumber'].setValue(null);
      const customerData = this.customerForm.getRawValue();
      this.customerService
        .addCustomer(customerData)
        .subscribe(() => {
          this.isEditMode = false;
          this.toastr.success('Customer Added successfully!', 'Success');
          this.router.navigate(['/customers']);

        });
    }
  }

  /**
   * Cancel the edit mode and reset form.
   */
  cancelEdit(): void {
    this.isEditMode = false;
    this.loadCustomerDetails();
  }
}
