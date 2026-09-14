# Rose FC — VGF Internal Registration Portal

## Files
- `vgf-registration.html`: member login + registration form.
- `api/vgf-auth.js`: server-side member-code validation.
- `api/vgf-register.js`: validates the form and forwards a row to Power Automate.
- `ROSE_FC_VGF_REGISTRATION_2026.xlsx`: Excel template with table `VGFRegistrationTable`.
- `docs/roseball-foundation.pdf`: Roseball Foundation Version 1.0.
- `docs/roseball-forward.pdf`: Roseball Forward Version 1.0.
- `POWER_AUTOMATE_SETUP.md`: connection instructions.

## Add to the existing Rose website
Copy `vgf-registration.html`, `api/`, `docs/`, and the Excel template into the repository root (or preserve equivalent paths).
The page expects the existing Rose website files `styles.css` and `rose-fc-logo.png` in the same root.

## VGF PDF still required
The official VGF regulations PDF was not supplied with the source material used to build this package. Once received:
1. Save it as `docs/vgf-regulations.pdf`.
2. In `vgf-registration.html`, change the VGF PDF button from disabled to:
   `<a class="pdf-btn" href="docs/vgf-regulations.pdf" target="_blank" rel="noopener">XEM PDF</a>`
3. Replace `versions: { vgf: 'TBD', ... }` with the correct VGF document version/date.

Do not mark a player as having accepted a VGF PDF version that was not actually shown to them.

## Vercel Environment Variables
Set:
- `ROSE_MEMBER_CODE` = the internal member password selected by Rose FC.
- `ROSE_AUTH_SECRET` = long random secret.
- `POWER_AUTOMATE_WEBHOOK_URL` = HTTP trigger URL from Power Automate.

The password is intentionally not hard-coded into the downloadable website source.
