import test from 'node:test';
import assert from 'node:assert/strict';
import { submissionSummary, formatSubmissionDeadline } from '../lib/submission.ts';

const now = Date.parse('2026-10-20T10:00:00+07:00');
const project = { availability: 'open', deadline: '2026-10-21T11:30:00+07:00', deadlinePrecision: 'datetime' };
test('counts down precise deadlines and handles exact expiry', () => {
  assert.equal(submissionSummary(project, 'en', now), '1d 1h 30m until submission deadline');
  assert.equal(submissionSummary(project, 'en', Date.parse(project.deadline)), 'Submission deadline has passed');
});
test('missing dates and unverified or terminal states never promise an open bid', () => {
  assert.match(submissionSummary({ availability: 'unknown' }, 'en', now), /Time remaining unknown/);
  for (const availability of ['closed', 'cancelled', 'awarded', 'draft']) {
    assert.equal(submissionSummary({ ...project, availability }, 'en', now), 'Not accepting submissions');
  }
  assert.match(submissionSummary({ ...project, availability: 'unverified' }, 'en', now), /unconfirmed/);
});
test('date-only deadlines use Bangkok calendar days without invented hours', () => {
  assert.equal(submissionSummary({ ...project, deadlinePrecision: 'date' }, 'en', now), '1 calendar day until closing date');
  assert.match(submissionSummary({ ...project, deadlinePrecision: 'date' }, 'en', Date.parse('2026-10-21T00:01:00+07:00')), /Closes today/);
});
test('unknown precision never renders UTC midnight as a confirmed 07:00 deadline', () => {
  for (const deadlinePrecision of ['date', 'unknown', undefined]) {
    const item = { ...project, deadline: '2026-10-28T00:00:00.000Z', deadlinePrecision };
    for (const lang of ['th', 'en']) {
      assert.doesNotMatch(formatSubmissionDeadline(item, lang), /07:00/);
      assert.match(formatSubmissionDeadline(item, lang), /28/);
    }
    assert.equal(submissionSummary(item, 'th', now), 'อีก 8 วันถึงวันปิดรับ');
  }
  assert.match(formatSubmissionDeadline({ ...project, deadline: '2026-10-28T00:00:00Z' }, 'th'), /07:00/);
});
test('future submission opening is distinct from a future closing deadline', () => {
  assert.match(submissionSummary({ ...project, submissionStartAt: '2026-10-20T12:00:00+07:00' }, 'en', now), /Not open yet.*0d 2h 0m/);
  assert.match(submissionSummary(project, 'th', now), /เหลือ 1 วัน 1 ชม. 30 นาที/);
});
