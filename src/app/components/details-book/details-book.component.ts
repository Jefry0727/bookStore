import { BookInterface } from './../../models/book';
import { DataApiService } from './../../services/data-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-book',
  templateUrl: './details-book.component.html',
  styleUrls: ['./details-book.component.css']
})
export class DetailsBookComponent implements OnInit {

  public book: BookInterface;
  constructor(private dataApi: DataApiService) { }

  ngOnInit() {
    const idBook = 'a4rPwkkV0jws2i76JlJd';
    this.dataApi.getOneBook(idBook).subscribe(book => {

      console.log('the book',book);


    });
  }

}
