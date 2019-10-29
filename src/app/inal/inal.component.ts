import { Component, OnInit } from '@angular/core';
import { InalDTO } from '../dto/inal-dto';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { InalService } from '../services/inal/inal.service';
import { TreeNode } from '../dto/tree-node';
import { CreateInalComponent } from './create-inal/create-inal.component';

@Component({
  selector: 'app-inal',
  templateUrl: './inal.component.html',
  styleUrls: ['./inal.component.sass']
})
export class InalComponent implements OnInit {

  customColumn = 'action';
  defaultColumns = ['id', 'denomination', 'rnpa', 'batch', 'businessName', 'createdDate', 'expirationDate', 'product'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<InalDTO>;

  private inalData: InalDTO[] = [];

  private data: TreeNode<InalDTO>[];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<InalDTO>,
    private dialogService: NbDialogService,
    private inalService: InalService) { }

  ngOnInit() {
    this.inalService.getAll().subscribe(response => {
      this.inalData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateInalComponent).onClose.subscribe((senasa: any) => {
      this.inalData.push(senasa);
      this.initData();
    });
  }

  delete(inal: InalDTO) {
    // this.dialogService.open(DeleteSenasaComponent, {context: {inal: inal}})
    // .onClose.subscribe((deletedId: number) => {
    //     this.inalData = this.inalData.filter(senasa => senasa.id !== deletedId);
    //     this.initData();
    // });
  }

  initData() {
    this.data = this.inalData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
