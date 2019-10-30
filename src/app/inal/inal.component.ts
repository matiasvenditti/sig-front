import { Component, OnInit } from '@angular/core';
import { InalDTO } from '../dto/inal-dto';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { InalService } from '../services/inal/inal.service';
import { TreeNode } from '../dto/tree-node';
import { CreateInalComponent } from './create-inal/create-inal.component';
import { DeleteInalComponent } from './delete-inal/delete-inal.component';

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
    this.dialogService.open(CreateInalComponent).onClose.subscribe((inal: any) => {
      if(inal) {
        this.inalData.push(inal);
        this.initData();
      }
    });
  }

  delete(inal: InalDTO) {
    this.dialogService.open(DeleteInalComponent, {context: {inal: inal} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.inalData = this.inalData.filter(inal => inal.id !== deletedId);
        this.initData();
      }
    });
  }

  initData() {
    this.data = this.inalData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
