import React, { useEffect, useState } from 'react';
import { useModal } from '../context/ModalContext';

const WaitlistModal = () => {
  const { isWaitlistModalOpen, closeWaitlistModal, openWaitlistModal, waitlistCount, incrementWaitlist, initialStatus } = useModal();
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    notes: '',
    website_url: '',
  });
  const [status, setStatus] = useState(initialStatus || 'idle'); // idle | loading | success

  useEffect(() => {
    if (initialStatus === 'success') {
      setStatus('success');
    }
  }, [initialStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutomaticallyOpened) {
        openWaitlistModal();
        setHasAutomaticallyOpened(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasAutomaticallyOpened, openWaitlistModal]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch("/waitlist.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          full_name: form.full_name,
          email: form.email,
          notes: form.notes,
          website_url: form.website_url
        })
      });
    } catch (err) {
      console.error(err);
    }

    incrementWaitlist();
    setStatus('success');
  };

  const handleClose = () => {
    closeWaitlistModal();
    // Reset after close animation
    setTimeout(() => {
      setStatus('idle');
      setForm({ full_name: '', email: '', notes: '', website_url: '' });
    }, 300);
  };

  if (!isWaitlistModalOpen) return null;

  const inputStyle = {
    width: '100%',
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border-subtle)',
    color: 'var(--text-primary)',
    borderRadius: '4px',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
      }}
    >
      <div
        className="modal-content bento-card mobile-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '550px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-medium)',
          padding: 'clamp(1.5rem, 5vw, 3rem)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: '0.5rem',
            lineHeight: '1',
          }}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <h2 className="mb-sm">JOIN THE WAITLIST.</h2>
          <p className="text-muted" style={{ fontSize: '0.9rem' }}>
            Be among the first to get access to Connex. Join the waitlist and we'll reach out when you're up.
          </p>
          {waitlistCount !== null && (
            <div style={{
              display: 'inline-block',
              marginTop: '0.75rem',
              padding: '6px 14px',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              color: 'var(--text-muted)',
            }}>
              {waitlistCount} {waitlistCount !== 1 ? 'PEOPLE' : 'PERSON'} ON THE WAITLIST
            </div>
          )}
        </div>

        {/* SUCCESS STATE */}
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#00ff88', textShadow: '0 0 15px #00ff88' }}>✓</div>
            <h3 className="mb-sm">YOU'RE ON THE LIST.</h3>
            <p className="text-muted" style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Thanks {form.full_name || "for joining"}! Thank you for supporting Connex Technologies.
            </p>

            {waitlistCount !== null && (
              <p style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                You're among {waitlistCount} people on the waitlist.
              </p>
            )}

            <button
              onClick={handleClose}
              className="btn btn-primary"
              style={{ marginTop: '1.5rem', padding: '12px 32px' }}
            >
              CLOSE
            </button>
          </div>
        ) : (
          /* FORM */
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from users but bots will fill it */}
            <div style={{ display: 'none' }} aria-hidden="true">
              <label htmlFor="website_url">Website URL</label>
              <input
                type="text"
                name="website_url"
                id="website_url"
                value={form.website_url}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <div className="form-group mb-sm">
              <label className="mono-label mb-xs" style={{ display: 'block' }}>FULL NAME</label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="form-control"
                style={inputStyle}
                required
              />
            </div>
            <div className="form-group mb-sm">
              <label className="mono-label mb-xs" style={{ display: 'block' }}>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                style={inputStyle}
                required
              />
            </div>
            <div className="form-group mb-md">
              <label className="mono-label mb-xs" style={{ display: 'block' }}>MESSAGE / PROJECT NOTES</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="form-control"
                rows="4"
                style={{ ...inputStyle, resize: 'none' }}
                placeholder="Tell us about your interest or institutional needs..."
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', marginBottom: '1rem', opacity: status === 'loading' ? 0.8 : 1 }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'SUBMITTING...' : 'JOIN WAITLIST'}
            </button>

            <p className="text-center" style={{ fontSize: '0.75rem', opacity: 0.7, lineHeight: '1.4' }}>
              We'll never share your information. Early signups get priority access when we launch.
            </p>

            <div className="text-center mt-md">
              <button
                type="button"
                onClick={handleClose}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem', opacity: 0.6 }}
              >
                I'll look around first
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
