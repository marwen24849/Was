import { Component } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import {
  Step,
  Uid, BranchedStep,
  Definition,
  Designer,
  ToolboxConfiguration,
  StepsConfiguration,
  ValidatorConfiguration,
  Properties,
  RootEditorContext,
  StepEditorContext,
  ToolboxGroupConfiguration,
  SequentialStep,

} from 'sequential-workflow-designer';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import { GroupService } from '../../core/service/group/group.service';
import { DesignerService } from '../../core/service/designer/designer.service'
import { group, sequence } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { WorkflowService } from '../../core/service/workflow/workflow.service'; // Update the path
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PublishAutomationDialogComponent } from './publish-automation-dialog/publish-automation-dialog.component';
import { DisplayScriptDialogComponent } from './display-script-dialog/display-script-dialog.component';
import { MyDefinition } from '../../core/models/interface/MyDefinition';
import { PublishTemplateDialogComponent } from './publish-template-dialog/publish-template-dialog.component';
import { Process } from '../../core/models/interface/Process';
import { Router } from '@angular/router';



function createDefinition(workflow: any): MyDefinition {
  return {
    id: workflow.id,
    name: workflow.name,
    properties: workflow.properties,
    sequence: workflow.sequence
  };

}

@Component({
  selector: 'app-designer',
  standalone: true,
  imports: [MatTabsModule, MatInputModule, MatButtonModule,
    SequentialWorkflowDesignerModule, CommonModule, FormsModule,
    ReactiveFormsModule, MatDialogModule, MatInputModule],
  providers: [
    DesignerService
  ],
  templateUrl: './designer.component.html',
  styleUrl: './designer.component.scss'
})





export class DesignerComponent {

  private designer?: Designer;
  public definition!: MyDefinition;
  scriptLines: string[] = [];

  public definitionJSON?: string;
  public script?: string;
  public selectedStepId: string | null = null;
  public isReadonly = false;
  public isToolboxCollapsed = false;
  public isEditorCollapsed = false;
  public isValid?: boolean;
  public toolboxConfiguration!: ToolboxConfiguration;













  //-=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=-

  constructor(private designerService: DesignerService,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private workflowService: WorkflowService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeToolboxConfiguration();
  }

  goToProjects(): void {
    this.router.navigate(['/projects']); // Navigate to the 'projects' route when button is clicked
  }


  openScriptDialog(): void {
    const dialogRef = this.dialog.open(DisplayScriptDialogComponent, {
      width: '600px', // Adjust width as needed
      data: { projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }



  openPublishTemplateDialog(): void {
    const dialogRef = this.dialog.open(PublishTemplateDialogComponent, {
      data: { projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);

      }
    });
  }

  openPublishAutomationDialog(): void {
    const dialogRef = this.dialog.open(PublishAutomationDialogComponent, {
      data: { projectId: this.projectId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog result:', result);
      }
    });
  }
  // ++++++++++++++++++++++++++++++++++++++++++++++++EDITOR+++++++++++++++++++++++++++++++++++++++++++++++
  newPropertyName!: any;
  newPropertyValue!: any;
  showAddProperty: boolean = false;

  addNewProperty(properties: any): void {
    if (this.newPropertyName && this.newPropertyValue) {
      properties[this.newPropertyName] = this.newPropertyValue;
      this.newPropertyName = '';
      this.newPropertyValue = '';
    }
  }

  removeProperty(properties: any, propertyName: any): void {
    delete properties[propertyName]; 
  }
































  // ++++++++++++++++++++++++++++++++++++++++++++++++TOOLBOX+++++++++++++++++++++++++++++++++++++++++++++++


  fetchGroups(): Promise<ToolboxGroupConfiguration[]> {
    return new Promise((resolve, reject) => {
      this.designerService.getAllCategories().subscribe({
        next: (groups: ToolboxGroupConfiguration[]) => resolve(groups),
        error: (err: any) => reject(err)
      });
    });
  }

  fetchStepsForGroup(groupId: string): Promise<Step[]> {
    return new Promise((resolve, reject) => {
      this.groupService.getTasksByGroupId(groupId).subscribe({
        next: (steps: Step[]) => resolve(steps),
        error: (err: any) => reject(err)
      });
    });
  }



  async initializeToolboxConfiguration() {
    try {
      const fetchedGroups = await this.fetchGroups();
      console.log("Fetched groups:", fetchedGroups);

      const processedGroups = await Promise.all(
        fetchedGroups.map(async (group: any) => {
          const steps = await this.fetchStepsForGroup(group.id);
          return {
            name: group.name || 'Unnamed Group',
            steps: steps.map((step: Step) => ({
              templateId: step.id || 'unknown',
              componentType: step.componentType || 'task',
              name: step.name || 'Unnamed Step',
              type: step.type || 'unknown',
              properties: step.properties || {}
            }))
          };
        })
      );
      console.log("Processed groups:", processedGroups);
      const coreGroup = {
        name: 'Core Group',
        steps: [
          {
            templateId: "666485e64e472167ce740a41",
            componentType: 'container',
            name: 'Container',
            type: 'process',
            properties: {},
            sequence: [
            ],
          },
        ]
      };
      processedGroups.unshift(coreGroup);

      this.toolboxConfiguration = {
        labelProvider: step => step.name,
        descriptionProvider: step => `Description for ${step.name}`,
        isCollapsed: false,
        groups: processedGroups || []
      };

      console.log('Toolbox configuration updated:', this.toolboxConfiguration);
    } catch (error) {
      console.error('Failed to initialize toolbox configuration:', error);
    }
  }

  getPropertyType(property: any): string {
    const validTypes = ['text', 'number', 'email'];

    if (property && property.value && property.value.type && validTypes.includes(property.value.type)) {
      return property.value.type;
    } else {
      console.error('Invalid property type:', property.value?.type);
      return 'text';
    }
  }
  getPropertyValue(property: any): string {
    return property.value || '';
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++API+++++++++++++++++++++++++++++++++++++++++++++++

  updateProject() {
    this.designerService.updateProject(this.definition.id, this.definition).subscribe((response) => {
      console.log("Workflow saved", response);
    })

  }


  generateWorkflowScript() {
    this.designerService.generateWorkflowScript(this.projectId).subscribe((response) => {
      console.log("Script generated successfully ===>", JSON.parse(response));

    })

  }





  //-=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=--=-=-=-=-=-=-=-=--=-

  projectId!: string;

  public ngOnInit() {
    this.updateDefinitionJSON();
    this.fetchGroups();
    this.route.params.subscribe(params => {
      this.projectId = params['id'];

    });
    this.workflowService.getProjectById(this.projectId).subscribe((workflow) => {
      this.definition = createDefinition(workflow);
    })
  }

  loadProject(id: string): void {
    this.workflowService.getProjectById(id).subscribe(project => {
      this.definition = createDefinition(project);
      console.log('Loaded project:', project);
    });
  }


  public onDefinitionChanged(definition: MyDefinition) {
    this.definition = definition;
    this.updateIsValid();
    this.updateDefinitionJSON();
    this.updateProject()
    console.log('definition has changed');
    console.log("this is the flow", JSON.stringify(this.definition));
  }

  private updateDefinitionJSON() {
    this.definitionJSON = JSON.stringify(this.definition, null, 2);
    //this.definitionJSON = JSON.parse(JSON.stringify(this.workflow));
  }













  public updateName(step: Step, event: Event, context: StepEditorContext) {
    step.name = (event.target as HTMLInputElement).value;
    context.notifyNameChanged();
  }

  public updateProperty(properties: Properties, name: any, event: Event, context: RootEditorContext | StepEditorContext) {
    properties[name] = (event.target as HTMLInputElement).value;
    context.notifyPropertiesChanged();
  }

  public reloadDefinitionClicked() {
    ////////this.definition = createDefinition();
    //this.definition = createDefinition(this.workflow);
    this.updateDefinitionJSON();
  }



  // =============================OTHER CONFIGS===============================================================================================================================================================================================

  public readonly stepsConfiguration: StepsConfiguration = {
    iconUrlProvider: () => './assets/1.svg'
  };
  public readonly validatorConfiguration: ValidatorConfiguration = {
    //step: (step: Step) => !!step.name && Number(step.properties['velocity']) >= 0,
    //root: (definition: Definition) => Number(definition.properties['velocity']) >= 0
  };


  public onDesignerReady(designer: Designer) {
    this.designer = designer;
    this.updateIsValid();
    console.log('designer ready', this.designer);
  }


  public toggleReadonlyClicked() {
    this.isReadonly = !this.isReadonly;
  }

  public toggleSelectedStepClicked() {
    if (this.selectedStepId) {
      this.selectedStepId = null;
    } else if (this.definition.sequence.length > 0) {
      this.selectedStepId = this.definition.sequence[0].id;
    }
  }

  public toggleToolboxClicked() {
    this.isToolboxCollapsed = !this.isToolboxCollapsed;
  }

  public toggleEditorClicked() {
    this.isEditorCollapsed = !this.isEditorCollapsed;
  }


  public onSelectedStepIdChanged(stepId: string | null) {
    this.selectedStepId = stepId;
  }

  public onIsToolboxCollapsedChanged(isCollapsed: boolean) {
    this.isToolboxCollapsed = isCollapsed;
  }

  public onIsEditorCollapsedChanged(isCollapsed: boolean) {
    this.isEditorCollapsed = isCollapsed;
  }

  private updateIsValid() {
    this.isValid = this.designer?.isValid();
  }

}
