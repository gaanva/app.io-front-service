import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { AuthClientConfig } from '@auth0/auth0-angular';
import { HighlightModule } from 'ngx-highlightjs';
import { ApiService } from 'src/app/api.service';
import { IntegrationAppClient } from '@integration-app/sdk'

@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
  styleUrls: ['./external-api.component.css'],
  standalone: true,
  imports: [HighlightModule, NgClass, NgIf]
})
export class ExternalApiComponent {
  responseJson: string;
  audience: string | undefined;
  hasApiError = false;
  integrationApp: any;
  constructor(
    private api: ApiService,
    private configFactory: AuthClientConfig
  ) {
    this.audience = this.configFactory.get()?.authorizationParams.audience;
    this.integrationApp = new IntegrationAppClient({
      // Test authentication token. You will need to replace it with the real one.
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDFkNjM0OTk5N2JlOTdjYmVlMmM0YiIsImlzcyI6IjFlZjRkNDZhLTg0MTctNDQxYi1hNjVhLWUxNmNiZWZmZGY0ZCIsImV4cCI6MTc1Njk0NzY3OX0.LJ_aBUrfYp_h6DwTlxZjAHB3Uz6GrLYzlyTGUneR-gc',
    })

    
  }

  pingApi() {
    this.api.ping$().subscribe({
      next: (res) => {
        this.hasApiError = false;
        this.responseJson = JSON.stringify(res, null, 2).trim();
      },
      error: () => this.hasApiError = true,
    });
  }

  async loadIntegrations(){
    await this.integrationApp.open()
  }
}
