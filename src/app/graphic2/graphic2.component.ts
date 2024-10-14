import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EChartsOption } from 'echarts';
import * as echarts from 'echarts';

@Component({
  selector: 'app-graphic2',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './graphic2.component.html',
  styleUrl: './graphic2.component.scss',
  providers: [provideEcharts()],
})
export class Graphic2Component {
  rawData: any[] = [];
  xAxisData: any[] = [];
  yAxisData: any[] = [];
  pairedData: any[] = [];
  chartInstance: any;

  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: this.xAxisData,
      axisLabel: {
        formatter: '{value}',
      },
      axisTick: {
        interval: 10,
      },
      name: 'Year',
      nameLocation: 'middle',
      nameGap: 25,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value}',
      },
      name: 'Population',
      nameLocation: 'middle',
      nameGap: 60,
    },
    series: [
      {
        data: this.yAxisData,
        type: 'line',
        showSymbol: false,
      },
    ],
  };

  constructor(private http: HttpClient) {}

  onChartInit(instance: any) {
    this.chartInstance = echarts.getInstanceById(instance.id);
    this.getData();
  }

  getData(): void {
    this.http.get('http://localhost:3000/v1/data2').subscribe((data: any) => {
      this.rawData = data;
      this.pairedData = this.rawData.map((item) => {
        return {
          year: item.year,
          population: item.population,
          employed: item.employed_total,
          unemployed: item.unemployed,
        };
      });
      this.xAxisData = this.getXAxis();
      this.yAxisData = this.getYAxis();
      this.setChartData(this.pairedData);
    });
  }

  private getXAxis(): any[] {
    return this.pairedData.map((x) => x.year);
  }

  private getYAxis(): any[] {
    return this.pairedData.map((y) => y.population);
  }

  private getEmployedData(): any[] {
    return this.pairedData.map(e => e.employed);
  }

  private getUnemployedData(): any[] {
    return this.pairedData.map(u => u.unemployed);
  }

  private setChartData(pairedData: any): void {
    const option: EChartsOption = {
      title: {
        left: 'center',
        text: 'US population, total employment and unemployment since 1940',
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (params: any) => {
          const index = params[0].dataIndex;
          return "Population: " + pairedData[index].population + " <br>" +
                  "Employed Total: " + pairedData[index].employed + "<br>" +
                  "Unemployed Total: " + pairedData[index].unemployed + "<br>";
        }
      },
      xAxis: {
        type: 'category',
        data: this.xAxisData,
        axisTick: {
          interval: 10,
        },
        tooltip: { }
      },
      yAxis: {
        type: 'value',
        tooltip: { },
      },
      series: [
        {
          name: "Population",
          data: this.yAxisData,
          type: 'line',
          showSymbol: false,
        },
        {
          name: "Employed",
          data: this.getEmployedData(),
          type: 'line',
          showSymbol: false,
        },
        {
          name: "Unemployed",
          data: this.getUnemployedData(),
          type: 'line',
          showSymbol: false,
        }
      ],
    };

    this.chartInstance.setOption(option);
  }
}
