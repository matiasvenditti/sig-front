import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateSenasaComponent } from './create-senasa/create-senasa.component';
import { SenasaService } from '../services/senasa/senasa.service';
import { DeleteSenasaComponent } from './delete-senasa/delete-senasa.component';
import { Senasa } from '../model/senasa';
import { SenasaDTO } from '../dto/senasa-dto';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

@Component({
  selector: 'app-senasa',
  templateUrl: './senasa.component.html',
  styleUrls: ['./senasa.component.scss']
})
export class SenasaComponent implements OnInit {
  
  private countries: string[];

  customColumn = 'action';
  defaultColumns = ['id', 'denomination', 'businessName', 'country', 'certification', 'createdDate', 'expirationDate', 'product'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<Senasa>;

  private senasaMock: Senasa[] = [
    {id: 1, denomination: 'Denomination 1', businessName: 'Business Name 1', country: 'Argentina', certification: true, createdDate: new Date(),  expirationDate: new Date(), product: null},
    {id: 2, denomination: 'Denomination 2', businessName: 'Business Name 2', country: 'Chile', certification: false, createdDate: new Date(), expirationDate: new Date(), product: null},
    {id: 3, denomination: 'Denomination 3', businessName: 'Business Name 3', country: 'Uruguay', certification: false, createdDate: new Date(), expirationDate: new Date(), product: null},
    {id: 4, denomination: 'Denomination 4', businessName: 'Business Name 4', country: 'Argentina', certification: true, createdDate: new Date(), expirationDate: new Date(), product: null},
  ]

  private data: TreeNode<Senasa>[] = this.senasaMock.map(elem => {return {data: elem}});

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Senasa>, private dialogService: NbDialogService, private senasaService: SenasaService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {
    this.senasaService.getAll().subscribe((response) => {
      console.log(response);
    })
  }

  open() {
    this.dialogService.open(CreateSenasaComponent);
  }

  delete(senasa: Senasa) {
    this.dialogService.open(DeleteSenasaComponent, {context: {senasa: senasa}})
    .onClose.subscribe((deleted: any) => {
      if (deleted) {
        this.senasaMock = this.senasaMock.filter(senasa => senasa.id !== deleted.id);
        this.data = this.senasaMock.map(elem => {return {data: elem}});
        this.dataSource = this.dataSourceBuilder.create(this.data);
      }
    });
  }

}
