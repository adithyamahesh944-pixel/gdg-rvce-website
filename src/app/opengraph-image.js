import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GDG on Campus RVCE — Build, Learn & Connect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '64px',
                    background: '#0c0e13',
                    color: '#ffffff',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {['#4285F4', '#EA4335', '#FBBC05', '#34A853'].map((c) => (
                        <div
                            key={c}
                            style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '999px',
                                background: c,
                            }}
                        />
                    ))}
                    <span style={{ fontSize: 28, fontWeight: 700, marginLeft: '10px', color: '#94a3b8' }}>
                        Google Developer Groups on Campus
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                    <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                        GDG on Campus RVCE
                    </div>
                    <div style={{ fontSize: 32, color: '#cbd5e1', maxWidth: '900px', lineHeight: 1.4 }}>
                        Workshops, hackathons, interactive 3D Builder Pass & campus developer community in Bengaluru.
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: '#64748b' }}>
                    <span>gdg-rvce-website.vercel.app</span>
                    <span style={{ color: '#4285F4', fontWeight: 700 }}>Interface Unlocked Edition</span>
                </div>
            </div>
        ),
        { ...size }
    );
}