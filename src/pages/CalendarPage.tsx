import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type AvailabilitySlot = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
};

type Meeting = {
  id: number;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
};

export default function CalendarPage() {
  const location = useLocation();
  const [events] = useState([
    { title: "Meeting with Investor", date: "2026-04-25" },
    { title: "Product Launch", date: "2026-04-28" },
    { title: "Demo Call", date: "2026-04-30" },
  ]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [formData, setFormData] = useState({ date: "", startTime: "", endTime: "" });
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editingAvailabilityId, setEditingAvailabilityId] = useState<number | null>(null);
  const [editingMeetingId, setEditingMeetingId] = useState<number | null>(null);

  useEffect(() => {
    const routedMeetings = (location.state as { meetings?: Meeting[] } | null)?.meetings;
    if (routedMeetings?.length) {
      setMeetings(routedMeetings);
    }
  }, [location.state]);

  const handleDateChange = (value: Date | Date[]) => {
    const nextDate = Array.isArray(value) ? value[0] : value;
    const dateString = nextDate?.toISOString().split("T")[0] || "";
    setSelectedDate(nextDate ?? new Date());
    setFormData((prev) => ({ ...prev, date: dateString }));
  };

  const resetForm = () => {
    setFormData({ date: "", startTime: "", endTime: "" });
    setEditingAvailabilityId(null);
    setEditingMeetingId(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.date || !formData.startTime || !formData.endTime) {
      return;
    }

    if (editingAvailabilityId !== null) {
      setAvailabilitySlots((prev) =>
        prev.map((slot) =>
          slot.id === editingAvailabilityId ? { ...slot, ...formData } : slot
        )
      );
    } else if (editingMeetingId !== null) {
      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting.id === editingMeetingId ? { ...meeting, ...formData } : meeting
        )
      );
    } else {
      setAvailabilitySlots((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
        },
      ]);
    }

    resetForm();
  };

  const handleEditAvailability = (slot: AvailabilitySlot) => {
    setEditingAvailabilityId(slot.id);
    setEditingMeetingId(null);
    setFormData({ date: slot.date, startTime: slot.startTime, endTime: slot.endTime });
  };

  const handleDeleteAvailability = (id: number) => {
    setAvailabilitySlots((prev) => prev.filter((slot) => slot.id !== id));
  };

  const handleEditMeeting = (meeting: Meeting) => {
    setEditingMeetingId(meeting.id);
    setEditingAvailabilityId(null);
    setFormData({ date: meeting.date, startTime: meeting.startTime, endTime: meeting.endTime });
  };

  const handleDeleteMeeting = (id: number) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
  };

  const getDayKey = (date: Date) => date.toISOString().split("T")[0];
  const meetingDates = new Set(meetings.map((meeting) => meeting.date));

  return (
    <div style={{ padding: 20 }}>
      <style>{".meeting-day { background-color: #fef3c7 !important; color: #92400e !important; }"}</style>
      <h1>Business Calendar</h1>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "1fr 1fr" }}>
        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Availability Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={({ date, view }) => (view === "month" && meetingDates.has(getDayKey(date)) ? "meeting-day" : undefined)}
            tileContent={({ date, view }) =>
              view === "month" && meetingDates.has(getDayKey(date)) ? <span style={{ fontSize: 10 }}>●</span> : null
            }
          />
        </div>

        <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
          <h2 style={{ marginTop: 0 }}>Add / Modify Availability</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
            <label>
              Date
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>

            <label>
              Start Time
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, startTime: e.target.value }))}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>

            <label>
              End Time
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData((prev) => ({ ...prev, endTime: e.target.value }))}
                style={{ width: "100%", padding: 8, marginTop: 4 }}
              />
            </label>

            <button type="submit" style={{ padding: "10px 12px", cursor: "pointer" }}>
              {editingAvailabilityId !== null || editingMeetingId !== null ? "Save Changes" : "Save Availability"}
            </button>
            {(editingAvailabilityId !== null || editingMeetingId !== null) && (
              <button type="button" onClick={resetForm} style={{ padding: "10px 12px", cursor: "pointer" }}>
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Saved Availability Slots</h2>
        {availabilitySlots.length === 0 ? (
          <p>No availability slots added yet.</p>
        ) : (
          availabilitySlots.map((slot) => (
            <div key={slot.id} style={{ padding: 10, margin: 5, background: "#f3e8ff", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <b>{slot.date}</b> — {slot.startTime} to {slot.endTime}
              </span>
              <span>
                <button onClick={() => handleEditAvailability(slot)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDeleteAvailability(slot.id)}>Delete</button>
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Accepted Meetings</h2>
        {meetings.length === 0 ? (
          <p>No accepted meetings yet.</p>
        ) : (
          meetings.map((meeting) => (
            <div key={meeting.id} style={{ padding: 10, margin: 5, background: "#fef3c7", borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>
                <b>{meeting.title}</b> — {meeting.date} {meeting.startTime} to {meeting.endTime}
              </span>
              <span>
                <button onClick={() => handleEditMeeting(meeting)} style={{ marginRight: 8 }}>Edit</button>
                <button onClick={() => handleDeleteMeeting(meeting.id)}>Delete</button>
              </span>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 20, border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Upcoming Events</h2>
        {events.map((e, i) => (
          <div key={i} style={{ padding: 10, margin: 5, background: "#e3f2fd", borderRadius: 4 }}>
            <b>{e.date}</b> : {e.title}
          </div>
        ))}
      </div>
    </div>
  );
}