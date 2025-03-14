import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateSenasaComponent } from './create-senasa/create-senasa.component';
import { SenasaService } from '../services/senasa/senasa.service';
import { DeleteSenasaComponent } from './delete-senasa/delete-senasa.component';
import { Senasa } from '../model/senasa';
import { SenasaDTO } from '../dto/senasa-dto';
import { TreeNode } from '../dto/tree-node';
import { UpdateSenasaComponent } from './update-senasa/update-senasa.component';

@Component({
  selector: 'app-senasa',
  templateUrl: './senasa.component.html',
  styleUrls: ['./senasa.component.scss']
})
export class SenasaComponent implements OnInit {
  
  private countries: string[];

  customColumn = 'action';
  defaultColumns = ['id', 'businessName', 'country', 'reviewRequired', 'createdDate', 'product'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<Senasa>;

  private senasaData: Senasa[] = [];

  private data: TreeNode<Senasa>[];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Senasa>,
    private dialogService: NbDialogService,
    private senasaService: SenasaService) {}

  ngOnInit() {
    this.senasaService.getAll().subscribe(response => {
      this.senasaData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateSenasaComponent).onClose.subscribe((senasa: any) => {
      if(senasa){
        this.senasaData.push(senasa);
        this.initData();
      }
    });
  }

  delete(senasa: Senasa) {
    this.dialogService.open(DeleteSenasaComponent, {context: {senasa: senasa}} as Partial<any>)
    .onClose.subscribe((deletedId: number) => {
      if (deletedId) {
        this.senasaData = this.senasaData.filter(senasa => senasa.id !== deletedId);
        this.initData();
      }
    });
  }

  update(senasa: Senasa) {
    this.dialogService.open(UpdateSenasaComponent, {context: {senasa: senasa} as Partial<any>})
    .onClose.subscribe((update: Senasa) => {
      if (update) {
        const index = this.senasaData.findIndex(senasa => senasa.id === update.id);
        this.senasaData[index] = update;
        this.initData();
      }
    })
  }

  initData() {
    this.data = this.senasaData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
