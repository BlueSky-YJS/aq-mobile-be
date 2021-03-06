import { Component } from '@angular/core';
import { DatasetOptions, PlotOptions, Timespan } from 'helgoland-toolbox';
import { ModalController } from 'ionic-angular';

import { ModalLegendComponent } from '../../components/modal-legend/modal-legend';
import { ModalTimespanEditorComponent } from '../../components/modal-timespan-editor/modal-timespan-editor';
import { TimeseriesService } from '../../providers/timeseries/timeseries.service';

@Component({
  selector: 'page-diagram',
  templateUrl: 'diagram.html'
})
export class DiagramPage {

  public datasetIds: string[];

  public datasetOptions: Map<string, DatasetOptions> = new Map();

  public timespan = new Timespan(new Date().getTime() - 100000000, new Date().getTime());

  public diagramOptions: PlotOptions = {
    pan: {
      frameRate: 10,
      interactive: true
    },
    touch: {
      delayTouchEnded: 200,
      pan: 'x',
      scale: ''
    },
    yaxis: {
      additionalWidth: 17,
      labelWidth: 40,
      min: null,
      panRange: false,
      show: true,
    },
    showReferenceValues: true
  };

  constructor(
    private timeseriesSrvc: TimeseriesService,
    private modalCtrl: ModalController
  ) {
    this.datasetIds = this.timeseriesSrvc.datasetIds;
    this.datasetOptions = this.timeseriesSrvc.datasetOptions;
    this.timeseriesSrvc.onTimespanChanged.subscribe(timespan => this.timespan = timespan);
  }

  public timespanChanged(timespan: Timespan) {
    this.timeseriesSrvc.setTimespan(timespan);
    this.timespan = timespan;
  }

  public openTimeSettings() {
    const modal = this.modalCtrl.create(ModalTimespanEditorComponent, {
      timespan: this.timespan
    });
    modal.onDidDismiss(timespan => {
      if (timespan instanceof Timespan) this.timespanChanged(timespan);
    });
    modal.present();
  }

  public openLegend() {
    const modal = this.modalCtrl.create(ModalLegendComponent);
    modal.onDidDismiss(data => {
      if (data instanceof Timespan) this.timespanChanged(data);
    })
    modal.present();
  }

}
