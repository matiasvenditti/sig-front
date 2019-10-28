import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateSenasaComponent } from './create-senasa/create-senasa.component';
import { SenasaService } from '../services/senasa/senasa.service';
import { DeleteSenasaComponent } from './delete-senasa/delete-senasa.component';
import { Senasa } from '../model/senasa';
import { SenasaDTO } from '../dto/senasa-dto';
import { TreeNode } from '../dto/tree-node';

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

  private senasaData: Senasa[] = [
    // {id: 1, denomination: 'Denomination 1', businessName: 'Business Name 1', country: 'Argentina', certification: true, createdDate: new Date(),  expirationDate: new Date(), product: null},
    // {id: 2, denomination: 'Denomination 2', businessName: 'Business Name 2', country: 'Chile', certification: false, createdDate: new Date(), expirationDate: new Date(), product: null},
    // {id: 3, denomination: 'Denomination 3', businessName: 'Business Name 3', country: 'Uruguay', certification: false, createdDate: new Date(), expirationDate: new Date(), product: null},
    // {id: 4, denomination: 'Denomination 4', businessName: 'Business Name 4', country: 'Argentina', certification: true, createdDate: new Date(), expirationDate: new Date(), product: null},
  ]

  private data: TreeNode<Senasa>[];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Senasa>, private dialogService: NbDialogService, private senasaService: SenasaService) {}

  ngOnInit() {
    this.senasaService.getAll().subscribe(response => {
      this.senasaData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateSenasaComponent).onClose.subscribe((senasa: any) => {
      this.senasaData.push(senasa);
      this.initData();
    });
  }

  delete(senasa: Senasa) {
    this.dialogService.open(DeleteSenasaComponent, {context: {senasa: senasa}})
    .onClose.subscribe((deletedId: number) => {
        this.senasaData = this.senasaData.filter(senasa => senasa.id !== deletedId);
        this.initData();
    });
  }

  initData() {
    this.data = this.senasaData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
