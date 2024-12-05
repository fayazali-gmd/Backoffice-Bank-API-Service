import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'http://localhost:5151/api/Customer'; // Adjust base URL to match backend API
 
  private mockData: any[] = [
    {
        "customerNumber": 1001,
        "name": "Alice Johnson",
        "dateofBirth": "1988-03-14",
        "gender": "F"
    },
    {
        "customerNumber": 1002,
        "name": "Bob Brown",
        "dateofBirth": "1992-07-21",
        "gender": "M"
    },
    {
        "customerNumber": 1003,
        "name": "Clara Wilson",
        "dateofBirth": "1979-12-09",
        "gender": "F"
    }
];


  constructor(private http: HttpClient) {}

  /**
   * Fetch all customers from the backend
   */
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
    //return of(this.mockData); // Simulate an HTTP call with mock data
  }

  /**
   * Add a new customer
   * @param customer The customer object to add
   */
  addCustomer(customer: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, customer);
  }

  /**
   * Update an existing customer
   * @param id The ID of the customer to update
   * @param customer The updated customer object
   */
  updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, customer);
  }
}
