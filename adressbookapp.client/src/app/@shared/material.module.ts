import { NgModule } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatSelectModule } from '@angular/material/select';
// import { MatExpansionModule } from '@angular/material/expansion';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { MatSortModule } from '@angular/material/sort';
// import { MatCheckboxModule } from '@angular/material/checkbox';
// import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatStepperModule } from '@angular/material/stepper';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatTooltipModule } from '@angular/material/tooltip';
// import { MatRadioModule } from '@angular/material/radio';
// import { MatGridListModule } from '@angular/material/grid-list';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  imports: [
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    // MatSortModule,
    MatPaginatorModule,
    // MatTableModule,
    // MatTabsModule,
    // MatSidenavModule,
    // MatInputModule,
    MatSnackBarModule,
    // MatSelectModule,
    // MatExpansionModule,
    // MatCheckboxModule,
    // DragDropModule,
    // MatMenuModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatTooltipModule,
    // MatRadioModule,
    // MatGridListModule,
    // MatAutocompleteModule
  ],
  exports: [
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    // MatSortModule,
    MatPaginatorModule,
    // MatTableModule,
    // MatTabsModule,
    // MatSidenavModule,
    // MatInputModule,
    MatSnackBarModule,
    // MatSelectModule,
    // MatExpansionModule,
    // MatCheckboxModule,
    // DragDropModule,
    // MatMenuModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatTooltipModule,
    // MatRadioModule,
    // MatGridListModule,
    // MatAutocompleteModule
  ]
})
export class MaterialModule { }
