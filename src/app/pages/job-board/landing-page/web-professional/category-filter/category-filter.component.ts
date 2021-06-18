import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Category } from 'src/app/models/job-board/category';
import { TreeNode } from 'primeng/api';

import { JobBoardHttpService } from 'src/app/services/job-board/job-board-http.service';
import { MessageService } from 'src/app/pages/shared/services/message.service';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  @Input() bodyIn: any;
  @Output() bodyOut = new EventEmitter<any>();
  
  categories: Category[];
  selectedCategories: number[];
  treeNode: TreeNode[];
  selectedTreeNodes: TreeNode[];
  flagCategories: boolean;
  
  constructor(
    private jobBoardHttpService: JobBoardHttpService,
    private messageService: MessageService) {
      this.categories = [];
      this.treeNode = [];
      this.selectedCategories = [];
      this.selectedTreeNodes = [];
    }

  ngOnInit(): void {
    this.getFilterCategories();
  }

  getFilterCategories(): void {
    this.flagCategories = true;
    this.jobBoardHttpService.get('web-professional/filter-categories').subscribe(
      response => {
        this.flagCategories = false;
        this.categories = response['data'];
        this.treeNode = this.categoryToTreeNode(this.categories);
      }, error => {
        this.flagCategories = false;
        this.messageService.error(error);
      }
    );
  }

  categoryToTreeNode(categories: Category[]): TreeNode[] {
    const treeNode: TreeNode[] = [];

    for (const category of categories) {
      const treeNodeChildren: TreeNode[] = [];

      for (const child of category.children) {
        treeNodeChildren.push({label: child.name});
      }
      treeNode.push({label: category.name, children: treeNodeChildren});
      
    }
    return treeNode;
  }

  nodeSelect(event): void {
    this.selectedCategories = [];
    this.selectedTreeNodes.forEach(treeNode => {
      this.categories.forEach(category => {
        category.children.find(c => {
          if (c.name == treeNode.label) {
            this.selectedCategories.push(c.id);
          }
        });
      });
    });

    this.bodyIn.ids = this.selectedCategories;
    this.bodyOut.emit(this.bodyIn);
  }

  nodeUnselect(event): void {
    this.selectedCategories = [];
    this.selectedTreeNodes.forEach(treeNode => {
      this.categories.forEach(category => {
        category.children.find(c => {
          if (c.name == treeNode.label) {
            this.selectedCategories.push(c.id);
          }
        });
      });
    });

    if (this.selectedCategories.length > 0) {
      this.bodyIn.ids = this.selectedCategories;
      this.bodyOut.emit(this.bodyIn);
    } else {
      this.bodyIn.ids = null;
      this.bodyOut.emit(this.bodyIn);
    }
  }

}
