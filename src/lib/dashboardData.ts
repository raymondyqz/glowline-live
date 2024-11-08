export const inputData = {
  appointmentTypes: [
    { name: 'F. Cut', value: 35 },
    { name: 'M. Cut', value: 25 },
    { name: 'Color', value: 20 },
    { name: 'Style', value: 15 },
    { name: 'Other', value: 5 },
  ],
  callLengths: [
    { name: '0-5m', value: 45 },
    { name: '5-10m', value: 30 },
    { name: '10-15m', value: 15 },
    { name: '15m+', value: 10 },
  ],
  callCategories: [
    { name: 'Booking (New)', value: 40 },
    { name: 'Booking (Existing)', value: 35 },
    { name: 'Complaint', value: 15 },
    { name: 'Info Request', value: 10 },
  ],
  bookings: [
    { id: 1, name: 'Alice Johnson', service: 'Haircut & Style', details: 'Full head highlights, blowdry, toner', time: '10:00 AM', date: '2024-10-20', sentiment: 85 },
    { id: 2, name: 'Bob Smith', service: 'Color Treatment', details: 'NA', time: '11:30 AM', date: '2024-10-20', sentiment: 60 },
    { id: 3, name: 'Raymond Zhao', service: 'Color Treatment', details: 'Full head highlights, blowdry, toner',time: '2:00 PM', date: '2024-10-20', sentiment: 72 },
    { id: 4, name: 'David Brown', service: 'Beard Trim', details: 'NA',time: '3:30 PM', date: '2024-10-20', sentiment: 75 },
    { id: 5, name: 'Eve Wilson', service: 'Full Makeover', details: 'NA', time: '10:00 AM', date: '2024-10-21', sentiment: 20 },
  ],
  recentCalls: [
    { id: 1, phone: '(555) 123-4567', reason: 'Booking', duration: '3m 45s', startTime: '2024-10-20 14:30', sentiment: 'Positive' },
    { id: 2, phone: '(555) 987-6543', reason: 'Inquiry', duration: '2m 15s', startTime: '2024-10-20 13:45', sentiment: 'Neutral' },
    { id: 3, phone: '(555) 246-8135', reason: 'Rescheduling', duration: '4m 30s', startTime: '2024-10-20 11:20', sentiment: 'Positive' },
    { id: 4, phone: '(555) 369-2580', reason: 'Complaint', duration: '6m 10s', startTime: '2024-10-20 10:05', sentiment: 'Negative' },
    { id: 5, phone: '(555) 159-7531', reason: 'Booking', duration: '3m 20s', startTime: '2024-10-20 09:30', sentiment: 'Positive' },
  ],
}

export const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

export const transcripts = {
  3: "Glow: Hi. This is Glow. I'm looking after Raymond's Hair Salon. How can I help you?\nRaymond: Hey. I'd like to book in for some highlights.\nGlow: Sure. No problem. Have you visited us before?\nRaymond: No. It's actually my first time.\nGlow: Okay. Great. Are you wanting a full or half head of highlights?\nRaymond: Full head, please.\nGlow: Perfect. So when are you available? And is there a particular hairstylist that you'd like to see?\nRaymond: No. I'm fine with whoever's free. Do you have any availability maybe sometime this Thursday or Friday?\nGlow: Sounds good. We have a slot at 10 AM on Thursday, the 24th, with our stylist, Sarah.\nRaymond: Actually, can we do the afternoon? That would be much better if that's okay.\nGlow: Sure. How's Thursday, the 24th at 2 PM? Our stylist, Caroline, is available at that time.\nRaymond: Yeah. That would be great.\nGlow: Amazing. Just to let you know, all our color appointments require a blow-dry, and you'll probably want a toner after those highlights. If this sounds okay, can I get your name to note in the booking, please?\nRaymond: Yeah. So it's Raymond Lawson Shaw.\nGlow: Great, Raymond. That's all booked in for you on Thursday, the 24th at 2 PM. Is there anything else I can help with?\nRaymond: That's all. Thanks.\nGlow: Great. We look forward to seeing you on Thursday.",
  1: "AI: Good morning! Thank you for calling Glowline Salon. How may I assist you today?\nAlice: Hi, I'd like to book a haircut and style for today if possible.\nAI: I'd be happy to help you with that. We have an opening at 10:00 AM today. Would that work for you?\nAlice: Yes, that's perfect!\nAI: Great! I've booked you for a haircut and style at 10:00 AM today. Is there anything else I can help you with?\nAlice: No, that's all. Thank you!\nAI: You're welcome! We look forward to seeing you at 10:00 AM. Have a great day!",
  2: "AI: Good morning! Thank you for calling Glowline Salon. How may I assist you today?\nBob: Hello, I need to schedule a color treatment.\nAI: I'd be happy to help you with that. May I know your preferred date and time?\nBob: Is there anything available today?\nAI: Yes, we have an opening at 11:30 AM today for a color treatment. Would that work for you?\nBob: That sounds good. I'll take it.\nAI: Excellent! I've booked you for a color treatment at 11:30 AM today. Is there anything else you need?\nBob: No, that's all. Thanks.\nAI: You're welcome! We look forward to seeing you at 11:30 AM. Have a great day!",
}