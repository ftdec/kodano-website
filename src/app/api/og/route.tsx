import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fafafa',
          backgroundImage: 'linear-gradient(135deg, #f0fdf4 0%, #fafafa 50%, #ecfdf5 100%)',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          {/* K Logo - simplified version */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: -10,
            }}
          >
            {/* Teal crescent */}
            <svg
              width="80"
              height="100"
              viewBox="0 0 80 100"
              fill="none"
            >
              <path
                d="M40 0C17.909 0 0 22.386 0 50s17.909 50 40 50c-11.046 0-20-22.386-20-50S28.954 0 40 0z"
                fill="#059669"
              />
            </svg>
            {/* Dark arrow */}
            <svg
              width="60"
              height="100"
              viewBox="0 0 60 100"
              fill="none"
            >
              <path
                d="M0 0L30 50L0 100H30L60 50L30 0H0z"
                fill="#064e3b"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: '#064e3b',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Kodano
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: '#059669',
              textAlign: 'center',
              maxWidth: 800,
              lineHeight: 1.4,
            }}
          >
            Mais segurança para pagamentos de alto valor
          </div>
        </div>

        {/* Subtle decorative elements */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            Verificação de identidade
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            Menos fraudes
          </div>
          <div
            style={{
              fontSize: 16,
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
              }}
            />
            Menos contestações
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}

