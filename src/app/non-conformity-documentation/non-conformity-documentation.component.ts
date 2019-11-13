import {Component, Input, OnInit} from '@angular/core';
import {StateManagerService} from '../services/state-manager.service';
import {NbDialogService, NbTreeGridDataSource, NbTreeGridDataSourceBuilder} from '@nebular/theme';
import {OrderService} from '../services/order/order.service';
import {OrderState} from '../model/order-state';
import {OrderDTO} from '../dto/order-dto';
import {TreeNode} from '../dto/tree-node';
import {BehaviorSubject} from 'rxjs';
import {NoDocumentationModalComponent} from '../no-documentation-modal/no-documentation-modal.component';
import {DocumentationModalComponent} from '../documentation-modal/documentation-modal.component';
import {ClaimDTO} from '../dto/claim-dto';
import {ClaimService} from '../services/claim/claim.service';
import {DeleteClaimModalComponent} from '../delete-claim-modal/delete-claim-modal.component';
import {ToasterService} from '../services/toaster.service';

@Component({
  selector: 'app-non-conformity-documentation',
  templateUrl: './non-conformity-documentation.component.html',
  styleUrls: ['./non-conformity-documentation.component.sass']
})
export class NonConformityDocumentationComponent implements OnInit {

  private data: TreeNode<ClaimDTO>[];
  private claimData: ClaimDTO[] = [];

  customColumn = 'resolver';
  defaultColumns = ['id', 'title', 'message', 'order'];
  allColumns = [...this.defaultColumns, this.customColumn];
  dataSource: NbTreeGridDataSource<ClaimDTO>;

  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<ClaimDTO>,
              private orderService: OrderService,
              private claimService: ClaimService,
              private dialogService: NbDialogService,
              private toasterService: ToasterService) { }

  ngOnInit() {
    this.init();
  }

  init() {
    this.claimService.getAll().subscribe(res => {
      this.claimData = res;
      this.data = res.map(elem => {return {data: elem}});
      this.dataSource = this.dataSourceBuilder.create(this.data);
    });

  }

  initData() {
    this.data = this.claimData.map(elem => {return {data: elem}});
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }

  openDeleteModal(claim: ClaimDTO) {
    this.dialogService.open(DeleteClaimModalComponent, {context: {claim: claim}} as Partial<any>).onClose.subscribe((claimId: number) => {
      if(claimId) {
        this.claimData = this.claimData.filter(filter => filter.id !== claimId);
        this.initData();
      }
    });
  }

  resolve(claim: ClaimDTO) {
    this.claimService.resolve(claim).subscribe(() => {
      this.toasterService.showSuccess('Orden de no conformidad resuelta', 'Operación Exitosa');
      this.claimData = this.claimData.filter(filter => filter.id !== claim.id);
      this.initData();
    }, () => {
      this.toasterService.showError('No se pudo resolver orden de no conformidad', 'Error');
    });
  }
}
