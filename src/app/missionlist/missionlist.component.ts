import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrl: './missionlist.component.css'
})
export class MissionlistComponent implements OnInit{
  missions: Mission[] = [];
  launchYears: number[] = [];
  filteredMissions: Mission[] = [];

  constructor(private spacexApiService: SpacexapiService) { }

  // get all missions
  ngOnInit(): void {
    // this.spacexApiService.sendGetRequestoDistinctLaunchYears()
    // .subscribe((years: any) => {
    //   this.launchYears = years;
    // });
    this.spacexApiService.sendGetRequest()
    .subscribe((res: any) => {
      console.log(res);
      this.missions = res;
      this.launchYears = this.extractLaunchYears(res);
      this.filteredMissions = this.missions;
    });
    this.filteredMissions = this.missions;
  }

  filterByYear(year: number): void {
    this.filteredMissions = this.missions.filter(mission => mission.launch_year === year);
    console.log('Filtering by year:', year);
  }

  extractLaunchYears(missions: Mission[]): number[] {
    const years = new Set<number>();
    missions.forEach(mission => years.add(mission.launch_year));
    return Array.from(years);
  }

  showAll(): void {
    this.filteredMissions = this.missions;
  }

}
