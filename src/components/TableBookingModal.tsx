import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TableReservation } from '../types/cafe';

export const TableBookingModal: React.FC = () => {
  const { 
    isReservationOpen, 
    setIsReservationOpen, 
    settings, 
    formatReservationWhatsAppUrl,
    showToast 
  } = useCart();

  const todayStr = new Date().toISOString().split('T')[0];

  const [date, setDate] = useState(todayStr);
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [guestCount, setGuestCount] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  if (!isReservationOpen) return null;

  // 11 am to 11 pm time slots
  const TIME_SLOTS = [
    '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM',
    '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM', '11:00 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !customerPhone.trim()) {
      showToast('Please provide your name and phone number');
      return;
    }

    if (date < todayStr) {
      showToast('Please select today or a future date');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const reservation: TableReservation = {
      id: `RES-${randomSuffix}`,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date,
      timeSlot,
      guestCount,
      specialRequests: specialRequests.trim() || undefined,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setConfirmedReservation(reservation);
    showToast(`Table reservation #${reservation.id} confirmed!`);
  };

  const handleSendBookingToWhatsApp = () => {
    if (!confirmedReservation) return;
    const url = formatReservationWhatsAppUrl(confirmedReservation);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setConfirmedReservation(null);
    setIsReservationOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#E5DDD2] overflow-hidden flex flex-col my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2A231E] p-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#E7B97B] font-semibold">
              Bob The Baker's Cafe
            </span>
            <h3 className="font-serif text-2xl font-medium text-white leading-tight">
              Table Reservation
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {confirmedReservation ? (
          /* Confirmation View */
          <div className="p-6 space-y-5">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center mx-auto text-[#25D366]">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-2xl font-semibold text-[#191614]">
                Reservation Request Created!
              </h4>
              <p className="text-xs text-[#6B5E52] max-w-xs mx-auto">
                Click below to send this booking request directly to Bob The Baker's Cafe on WhatsApp for instant confirmation.
              </p>
            </div>

            {/* Ticket Card */}
            <div className="p-4 rounded-xl bg-white border border-[#E5DDD2] space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                <span className="text-[#7A6E63]">Reference ID:</span>
                <span className="font-mono font-bold text-[#2A231E]">#{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                <span className="text-[#7A6E63]">Guest Name:</span>
                <span className="font-semibold text-[#191614]">{confirmedReservation.customerName}</span>
              </div>
              <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                <span className="text-[#7A6E63]">Date & Time:</span>
                <span className="font-semibold text-[#B45309]">
                  {confirmedReservation.date} at {confirmedReservation.timeSlot}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#F5EFEB] pb-2">
                <span className="text-[#7A6E63]">Party Size:</span>
                <span className="font-semibold text-[#191614]">{confirmedReservation.guestCount} Guest{confirmedReservation.guestCount > 1 ? 's' : ''}</span>
              </div>
              {confirmedReservation.specialRequests && (
                <div className="flex justify-between">
                  <span className="text-[#7A6E63]">Notes:</span>
                  <span className="font-light italic text-[#191614]">"{confirmedReservation.specialRequests}"</span>
                </div>
              )}
            </div>

            {/* Direct WhatsApp Confirmation Trigger */}
            <button
              onClick={handleSendBookingToWhatsApp}
              className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5A] text-white font-semibold text-xs sm:text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white stroke-none" />
              <span>Send Reservation to Cafe via WhatsApp</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={handleClose}
              className="w-full py-2.5 text-xs text-[#7A6E63] hover:text-[#191614] font-medium cursor-pointer"
            >
              Back to Menu
            </button>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleBookingSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* Date & Guest Count Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A] mb-1">
                  Reservation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white rounded-lg border border-[#D9CFC4] focus:outline-hidden focus:border-[#191614] text-[#191614]"
                  />
                </div>
                <span className="text-[10px] text-[#8C7E72] mt-0.5 block">
                  Select today or future date
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A] mb-1">
                  Guests Count (Max 4)
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGuestCount(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer text-center ${
                        guestCount === num
                          ? 'bg-[#2A231E] border-[#2A231E] text-white shadow-xs'
                          : 'bg-white border-[#D9CFC4] text-[#4A4036] hover:bg-[#F2ECE3]'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-[#8C7E72] mt-0.5 block">
                  Max 4 people per table
                </span>
              </div>
            </div>

            {/* Time Slot Picker (11 am to 11 pm) */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#73665A]">
                  Preferred Time Slot
                </label>
                <span className="text-[11px] text-[#B45309] font-medium">11:00 AM – 11:00 PM</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-1.5 px-2 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                      timeSlot === slot
                        ? 'bg-[#2A231E] border-[#2A231E] text-white'
                        : 'bg-white border-[#D9CFC4] text-[#4A4036] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 pt-2 border-t border-[#EAE3D9]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full text-xs px-2.5 py-2 bg-white rounded-lg border border-[#D9CFC4] focus:outline-hidden focus:border-[#191614]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full text-xs px-2.5 py-2 bg-white rounded-lg border border-[#D9CFC4] focus:outline-hidden focus:border-[#191614]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-[#7A6E63] font-medium mb-1">
                  Special Notes (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Window side, birthday surprise celebration..."
                  className="w-full text-xs px-2.5 py-2 bg-white rounded-lg border border-[#D9CFC4] focus:outline-hidden focus:border-[#191614]"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-[#2A231E] hover:bg-[#191614] text-white font-semibold text-xs tracking-wide shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm & Open WhatsApp</span>
                <ArrowRight className="w-4 h-4 text-[#E7B97B]" />
              </button>
              <p className="text-[10px] text-center text-[#8C7E72] mt-1.5">
                Sent directly to owner's WhatsApp ({settings.displayPhone})
              </p>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};
