import { Component, OnInit } from '@angular/core';
import { TreeNode } from '../dto/tree-node';
import { TruckDTO } from '../dto/truck-dto';
import { NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbDialogService } from '@nebular/theme';
import { DriverDTO } from '../dto/driver-dto';
import { TruckService } from '../services/truck/truck.service';
import { DriverService } from '../services/driver/driver.service';
import { CreateTruckComponent } from './create-truck/create-truck.component';
import { DeleteTruckComponent } from './delete-truck/delete-truck.component';
import { UpdateTruckComponent } from './update-truck/update-truck.component';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.sass']
})
export class TruckComponent implements OnInit {

  private data: TreeNode<TruckDTO>[];

  customColumn = 'action';
  defaultColumns = ['id', 'brand', 'enrollment', 'model', 'driver'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<TruckDTO>;

  private drivers: DriverDTO[] = [];

  private truckData: TruckDTO[] = [];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<TruckDTO>,
    private dialogService: NbDialogService,
    private truckService: TruckService,
    private driverService: DriverService) { }

  ngOnInit() {
    this.truckService.getAll().subscribe(response => {
      this.truckData = response;
      this.data = response.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });

    this.driverService.getAll().subscribe(res => {
      this.drivers = res;
    })

  }

  open() {
    this.dialogService.open(CreateTruckComponent).onClose.subscribe((truck: TruckDTO) => {
      if(truck) {
        this.truckData.push(truck);
        this.initData();
      }
    });
  }

  delete(truck: TruckDTO) {
    this.dialogService.open(DeleteTruckComponent, {context: {truck: truck} as Partial<any>})
    .onClose.subscribe((deletedId: number) => {
      if(deletedId) {
        this.truckData = this.truckData.filter(truck => truck.id !== deletedId);
        this.initData();
      }
    });
  }

  update(truck: TruckDTO) {
    this.dialogService.open(UpdateTruckComponent, {context: {truck: truck} as Partial<any>})
    .onClose.subscribe((update: TruckDTO) => {
      if(update) {
        const index: number = this.truckData.findIndex(product => product.id === update.id);
        this.truckData[index] = update;
        this.initData();
      }
    })
  }


  initData() {
    this.data = this.truckData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

}
