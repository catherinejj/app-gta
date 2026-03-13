import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './presentation/module/auth.module';
import { ApprovalHistoriesModule } from './presentation/module/approval-histories.module';
import { ContractsModule } from './presentation/module/contracts.module';
import { DepartmentsModule } from './presentation/module/departments.module';
import { LeaveBalancesModule } from './presentation/module/leave-balances.module';
import { LeaveRequestsModule } from './presentation/module/leave-requests.module';
import { PublicHolidaysModule } from './presentation/module/public-holidays.module';
import { RequestTypeEligibilityRulesModule } from './presentation/module/request-type-eligibility-rules.module';
import { RequestTagsModule } from './presentation/module/request-tags.module';
import { RequestTypeTagsModule } from './presentation/module/request-type-tags.module';
import { RequestTypesModule } from './presentation/module/request-types.module';

@Module({
  imports: [
    AuthModule,
    PublicHolidaysModule,
    DepartmentsModule,
    ContractsModule,
    LeaveBalancesModule,
    ApprovalHistoriesModule,
    LeaveRequestsModule,
    RequestTagsModule,
    RequestTypesModule,
    RequestTypeEligibilityRulesModule,
    RequestTypeTagsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
