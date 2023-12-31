import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Common, CommonStatus } from '../../database.common.entity';
import { SchoolPage } from '../school-page/school-page.entity';
import { Member } from './member.entity';

@Entity()
export class MemberSchoolPageSubscribe extends Common {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => Member, (member) => member.schoolPagesSubscribed)
  @JoinColumn({
    name: 'member_id',
    foreignKeyConstraintName: 'fk_member_school_page_subscribe_1',
  })
  member: Member;

  @ManyToOne(() => SchoolPage)
  @JoinColumn({
    name: 'school_page_id',
    foreignKeyConstraintName: 'fk_member_school_page_subscribe_2',
  })
  schoolPage: SchoolPage;

  @Column({ type: 'varchar', length: 50, default: CommonStatus.ACTIVE })
  status: CommonStatus;

  @Column({ type: 'datetime', nullable: true })
  unsubscribedAt: Date;

  static of(member: Member, schoolPage: SchoolPage) {
    const memberSchoolPageSubscribe = new MemberSchoolPageSubscribe();
    memberSchoolPageSubscribe.member = member;
    memberSchoolPageSubscribe.schoolPage = schoolPage;
    return memberSchoolPageSubscribe;
  }

  unsubscribe() {
    this.unsubscribedAt = new Date();
    this.status = CommonStatus.INACTIVE;
  }
}
