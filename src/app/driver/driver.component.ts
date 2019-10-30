import { Component, OnInit } from '@angular/core';
import { NbTreeGridDataSourceBuilder, NbDialogService, NbTreeGridDataSource } from '@nebular/theme';
import { DriverDTO } from '../dto/driver-dto';
import { DriverService } from '../services/driver/driver.service';
import { TreeNode } from '../dto/tree-node';
import { CreateDriverComponent } from './create-driver/create-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.sass']
})
export class DriverComponent implements OnInit {

  private data: TreeNode<DriverDTO>[];

  customColumn = 'action';
  defaultColumns = ['id', 'firstName', 'lastName', 'dni', 'licenseExpirationDate'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<DriverDTO>;

  private driverData: DriverDTO[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<DriverDTO>,
    private dialogService: NbDialogService,
    private driverService: DriverService) { }

  ngOnInit() {
    this.driverService.getAll().subscribe(response => {
      this.driverData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    })
  }

  open() {
    this.dialogService.open(CreateDriverComponent).onClose.subscribe((driver: DriverDTO) => {
      this.driverData.push(driver);
      this.initData();
    });
  }

  delete(driver: DriverDTO) {
    this.dialogService.open(DeleteDriverComponent, {context: {driver: driver} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.driverData = this.driverData.filter(product => product.id !== deletedId);
        this.initData();
      }
    });
  }

  initData() {
    this.data = this.driverData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
