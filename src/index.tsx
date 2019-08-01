import * as React from 'react';

// Add the css styles...
import 'react-widgets/dist/css/react-widgets.css';

// ...Or if you prefer to use the Less or Sass files directly
// import 'react-widgets/lib/less/react-widgets.less';
// import 'react-widgets/lib/scss/react-widgets.scss';

import { Widget } from '@phosphor/widgets';
import { ReactWidget } from '@jupyterlab/apputils';

import { IDisposable, DisposableDelegate } from '@phosphor/disposable';

import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';

import { ToolbarButton } from '@jupyterlab/apputils';

import { DocumentRegistry } from '@jupyterlab/docregistry';

import { NotebookActions, NotebookPanel, INotebookModel } from '@jupyterlab/notebook';

import { nbformat } from '@jupyterlab/coreutils';

//import ProactiveButtonConnect from './ProactiveButtonConnect';
//import ProactiveHostInputText from './ProactiveHostInputText';
import ProactiveHostConnection from './ProactiveHostConnection';

//const pButtonConnect: Widget = ReactWidget.create(<Button label="Connect" />);
//const proactiveButtonConnect: Widget = ReactWidget.create(<ProactiveButtonConnect />);
//const proactiveHostInputText: Widget = ReactWidget.create(<ProactiveHostInputText />);
//const proactiveHostConnection: Widget = ReactWidget.create(<ProactiveHostConnection />);

/**
 * The plugin registration information.
 */
const extension: JupyterFrontEndPlugin<void> = {
    id: 'proactive-jupyterlab-extension:toolboxPlugin',
    autoStart: true,
    activate
};

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export
class ButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    /**
     * Create a new extension object.
     */
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        let callback = () => {
            NotebookActions.runAll(panel.content, context.session);
        };
        
        let button = new ToolbarButton({
            className: 'runAllButton',
            iconClassName: 'fa fa-fast-forward',
            onClick: callback,
            tooltip: 'Run All'
        });

        panel.toolbar.insertItem(6, 'runAll', button);
        return new DisposableDelegate(() => {
            button.dispose();
        });
    }
}

/**
 * A notebook widget extension that adds a drop down list to the toolbar.
 */
export
class ProactiveWidgetsExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        const callback = (params: any) => {
            const code_cell: nbformat.ICodeCell = {
                cell_type: 'code',
                execution_count: null,
                outputs: [],
                source: '#%connect(host='+params.host+', port='+params.port+', login='+params.user+', password='+params.pass+')',
                metadata: { trusted: false }
            };
            //console.log("code_cell: " + code_cell.source);
            const notebook = panel.content;
            const session = context.session;
            const model = notebook.model;
            const cell = model.contentFactory.createCodeCell({cell: code_cell});
            const active = notebook.activeCellIndex;
            model.cells.insert(active, cell);
            notebook.activeCellIndex = active;
            notebook.deselectAll();
            NotebookActions.run(notebook, session);
        };
        const proactiveHostConnection: Widget = ReactWidget.create(<ProactiveHostConnection callback={callback} />);

        //panel.toolbar.addItem("pButtonConnect", pButtonConnect);
        //panel.toolbar.addItem("proactiveButtonConnect", proactiveButtonConnect);
        //panel.toolbar.addItem("proactiveHostInputText", proactiveHostInputText);
        panel.toolbar.addItem("proactiveHostConnection", proactiveHostConnection);

        return new DisposableDelegate(() => {
            //pButtonConnect.dispose();
            //proactiveButtonConnect.dispose();
            //proactiveHostInputText.dispose();
            proactiveHostConnection.dispose();
        });
    }
}

/**
 * A notebook widget extension that adds a button to the toolbar.
 */
export
class ProactiveHelpButtonExtension implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel> {
    /**
     * Create a new extension object.
     */
    createNew(panel: NotebookPanel, context: DocumentRegistry.IContext<INotebookModel>): IDisposable {
        let callback = () => {
            const code_cell: nbformat.ICodeCell = {
                cell_type: 'code',
                execution_count: null,
                outputs: [],
                source: '#%help()',
                metadata: { trusted: false }
            };
            const notebook = panel.content;
            const session = context.session;
            const model = notebook.model;
            const cell = model.contentFactory.createCodeCell({cell: code_cell});
            const active = notebook.activeCellIndex;
            model.cells.insert(active, cell);
            notebook.activeCellIndex = active;
            notebook.deselectAll();
            NotebookActions.run(notebook, session);
        };
        
        let button = new ToolbarButton({
            className: 'helpButton',
            iconClassName: 'fa fa-question-circle-o',
            onClick: callback,
            tooltip: 'Proactive Help'
        });

        panel.toolbar.addItem('proactiveHelp', button);

        return new DisposableDelegate(() => {
            button.dispose();
        });
    }
}

/**
 * Activate the extension.
 */
function activate(app: JupyterFrontEnd) {
    app.docRegistry.addWidgetExtension('Notebook', new ButtonExtension());
    app.docRegistry.addWidgetExtension('Notebook', new ProactiveWidgetsExtension());
    app.docRegistry.addWidgetExtension('Notebook', new ProactiveHelpButtonExtension());
}

/**
 * Export the plugin as default.
 */
export default extension;
