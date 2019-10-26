import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { CreateSenasaComponent } from './create-senasa/create-senasa.component';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
}

@Component({
  selector: 'app-senasa',
  templateUrl: './senasa.component.html',
  styleUrls: ['./senasa.component.scss']
})
export class SenasaComponent implements OnInit {
  
  private countries: string[];

  customColumn = 'action';
  defaultColumns = [ 'size', 'kind', 'items'];
  allColumns = [ this.customColumn, ...this.defaultColumns];
  dataSource: NbTreeGridDataSource<FSEntry>;

  data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 2, kind: 'dir'}
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 0 }
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 0 }
    },
  ];

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private dialogService: NbDialogService) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  ngOnInit() {}

  open() {
    this.dialogService.open(CreateSenasaComponent)
  }

}
