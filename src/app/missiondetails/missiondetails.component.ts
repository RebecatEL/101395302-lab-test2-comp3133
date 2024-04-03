import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrl: './missiondetails.component.css'
})
export class MissiondetailsComponent implements OnInit {
  mission!: Mission;

  constructor(private spacexApiService: SpacexapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const flightNumber = Number(this.route.snapshot.paramMap.get('flightNumber'));
    this.spacexApiService.sendGetRequestByFlightNumber(flightNumber).subscribe((mission: Mission) => {
      this.mission = mission;
    });
  }
}
