import { Status } from './status';

export default class NewRequest {
  constructor(leaveTypeUser, startDateUser, durationUser, reasonUser, phoneNumberUser) {
    this.requestId = '';
    this.leaveType = leaveTypeUser ?? '';
    this.startDate = startDateUser ?? '';
    this.duration = typeof durationUser === 'number' ? durationUser : 0;
    this.reason = reasonUser ?? '';
    this.phoneNumber = phoneNumberUser ?? '';
    this.status = Status.PENDING;
    this.endDate = this.#calcEndDate(this.startDate, this.duration);
  }


  // --- private helpers ---
  #calcEndDate(startDate, duration) {
    const start = new Date(startDate);
    if (isNaN(start.getTime()) || typeof duration !== 'number' || duration <= 0) return null;
    const d = new Date(start);
    d.setDate(d.getDate() + duration - 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // --- setters recompute endDate automatically ---
  setLeaveType(type) { this.leaveType = type; }
  setStartDate(date) { this.startDate = date; this.endDate = this.#calcEndDate(this.startDate, this.duration); }
  setDuration(duration) { this.duration = duration; this.endDate = this.#calcEndDate(this.startDate, this.duration); }
  setReason(reason) { this.reason = reason; }
  setPhoneNumber(phoneNumber) { this.phoneNumber = phoneNumber; }
  setStatus(status) {
    if (Object.values(Status).includes(status)) this.status = status;
    else throw new Error('Invalid status');
  }
  setRequestId() {
    const today = new Date();
    const yy = String(today.getFullYear()).slice(-2);
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    // Generate a random 2-digit number for uniqueness (01-99)
    const randomNum = String(Math.floor(Math.random() * 99) + 1).padStart(2, '0');
    this.requestId = `${yy}${mm}${dd}${randomNum}`;
  }

  // --- getters ---
  getLeaveType() { return this.leaveType; }
  getStartDate() { return this.startDate; }
  getDuration() { return this.duration; }
  getEndDate() { return this.endDate; }
  getReason() { return this.reason; }
  getPhoneNumber() { return this.phoneNumber; }
  getStatus() { return this.status; }

  // --- (de)serialization ---
  toJSON() {
    return {
      leaveType: this.leaveType,
      startDate: this.startDate,
      duration: this.duration,
      endDate: this.endDate,
      reason: this.reason,
      phoneNumber: this.phoneNumber,
      status: this.status,
    };
  }

  static fromJSON(json) {
    const req = new NewRequest(
      json.leaveType,
      json.startDate,
      json.duration,
      json.reason,
      json.phoneNumber
    );
    // Validate/normalize status if present
    if (json.status && Object.values(Status).includes(json.status)) {
      req.status = json.status;
    }
    return req;
  }

  static validateRequest(request) {
    if (!request.leaveType || !request.startDate || !request.reason || !request.phoneNumber) return false;
    if (typeof request.duration !== 'number' || request.duration <= 0) return false;
    const startDate = new Date(request.startDate);
    return !isNaN(startDate.getTime());
  }

  static getDefaultRequest() {
    return new NewRequest('', '', 1, '', '');
  }
}
