import { NextResponse } from 'next/server';

/**
 * Node.js API Route handler for AGC Fast-Track Feasibility & Tender Requests
 * Endpoint: POST /api/quote
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      projectType,
      gfa,
      location,
      notes,
      currency = 'ETB',
      estimatedBudget,
      duration,
      contactName,
      contactPhone,
      contactEmail,
    } = body;

    // Validate minimum required fields
    if (!projectType || !gfa) {
      return NextResponse.json(
        { error: 'Missing required project parameters (projectType, gfa).' },
        { status: 400 }
      );
    }

    // Generate unique inquiry reference code (e.g., AGC-2026-9481)
    const timestamp = new Date().toISOString();
    const refCode = `AGC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const inquiryRecord = {
      referenceCode: refCode,
      status: 'RECEIVED_PENDING_ENGINEERING_REVIEW',
      receivedAt: timestamp,
      details: {
        projectType,
        gfa: `${Number(gfa).toLocaleString()} m²`,
        location: location || 'Addis Ababa Corridor',
        notes: notes || 'Standard 4-month fast-track delivery requested.',
        currency,
        estimatedBudget: estimatedBudget || 'Pending Detailed BOQ',
        projectedDuration: duration || '120 Calendar Days',
      },
      client: {
        name: contactName || 'Anonymous Corporate Inquirer',
        phone: contactPhone || 'Direct line requested',
        email: contactEmail || null,
      },
      assignedDesk: 'Seven S ET Trading PLC / AGC Tender Directorate',
    };

    // In a production environment, this can notify Telegram bot / send email / save to Postgres or Mongo.
    console.log('[AGC RFP Ingestion] New Tender Inbound:', inquiryRecord);

    return NextResponse.json(
      {
        success: true,
        message: 'Project feasibility inquiry successfully submitted to AGC Tender Desk.',
        referenceCode: refCode,
        data: inquiryRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[AGC RFP Ingestion Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing RFP inquiry.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ONLINE',
    service: 'Advanced General Contractor (AGC) Tender Feasibility Engine',
    version: '1.0.0',
    statutoryGrade: 'GC-1 (Grade One General Contractor)',
  });
}
