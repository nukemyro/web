import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EChartsOption } from 'echarts';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
  selector: 'app-graphic1',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graphic1.component.html',
  styleUrl: './graphic1.component.scss',
  providers: [provideEcharts()],
})
export class Graphic1Component {
  rawData: any[] = [];
  xAxisData: any[] = [];
  yAxisData: any[] = [];
  pairedData: any[] = [];
  chartInstance: any;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.xAxisData,
      axisLabel : {
        formatter: '{value}'
      },
      axisTick : {
        interval: 10,
      },
      name: 'Year',
      nameLocation: 'middle',
      nameGap: 25,
    },
    yAxis: {
      type: 'value',
      axisLabel : {
        formatter: '{value} %'
      },
      name: 'Percentage',
      nameLocation: 'middle',
      nameGap: 50
    },
    series: [
      {
        data: this.yAxisData,
        type: 'line',

      },
    ],
  };

  constructor(private http: HttpClient) {}

  onChartInit(instance: any) {
    this.chartInstance = echarts.getInstanceById(instance.id);
    this.getData();
  }

  getData(): void {
    this.http.get('http://localhost:3000/v1/data').subscribe((data: any) => {
      this.rawData = data;
      this.pairedData = this.rawData.map((item) => { return { year: item.year, percent: item.unemployed_percent }});
      this.xAxisData = this.getXAxis();
      this.yAxisData = this.getYAxis();
      this.setChartData();
    });
  }

  private getXAxis(): any[] {
    return this.pairedData.map(x => x.year);
  }

  private getYAxis(): any[] {
    return this.pairedData.map(y => y.percent);
  }

  private setChartData(): void {
    const option: EChartsOption = {
      title: {
        left: 'center',
        text: 'US unemployment rates since 1940',
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
        axisTick : {
          interval: 10,
        },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.yAxisData,
          type: 'line',
          showSymbol: false,
        },
      ],
    };

    this.chartInstance.setOption(option);
  }
}
