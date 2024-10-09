import { MatDialog } from '@angular/material/dialog';
import { UIService } from './../../@core/services/ui.service';
import { Component, OnInit } from '@angular/core';
import { finalize, take } from 'rxjs';
import { Person } from 'src/app/@core/models/person.model';
import { PersonDialogComponent } from 'src/app/@shared/components/person-dialog/person-dialog.component';
import { PersonsService } from 'src/app/@core/services/persons.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css'],
})
export class AddressBookComponent implements OnInit {
  people: Person[] = [];
  pageSize = 5;
  currentPage = 0;
  paginatedPeople : Person[] = [];

  constructor(private personsService: PersonsService, private uiService: UIService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.uiService.startLoading();
    this.personsService.getPersons().pipe(
      take(1),
      finalize(() => { this.uiService.stopLoading(); })
    ).subscribe((data) => {
      //console.log(data);
      this.people = data;
      const start = this.currentPage * this.pageSize;
      const end = start + this.pageSize;
      this.paginatedPeople = this.people.slice(start, end) ?? [];
    });
  }

  showAddress(person: Person): void {
    this.dialog.open(PersonDialogComponent, {
      minWidth: '300px',
      data: { name: person.name, address: person.address }
    });
  }

  // Method to handle pagination
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedPeople();
  }

  updatePaginatedPeople() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedPeople = this.people.slice(start, end) ?? [];
  }
}
