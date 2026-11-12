# Security Specification (`security_spec.md`)

## 1. Data Invariants

1. **Default-Deny Catch-All**: All paths not explicitly matched (`/{document=**}`) deny all reads and writes.
2. **Verified Authentication on Writes**: Every `create`, `update`, and `delete` operation requires `request.auth != null && request.auth.token.email_verified == true`.
3. **Identity Integrity (`authorId` / `userId`)**:
   - A `CommunityWorksheet` can only be created if `incoming().authorId == request.auth.uid`.
   - An `ActivityLog` can only be created if `incoming().userId == request.auth.uid`.
4. **Strict Key & Size Boundaries**:
   - `CommunityWorksheet` enforces `hasAll` and `hasOnly` for `['title', 'theme', 'pedagogicalGoal', 'activityType', 'difficulty', 'authorId', 'authorName', 'visibility', 'worksheetData', 'createdAt']`.
   - `ActivityLog` enforces `hasAll` and `hasOnly` for `['actionType', 'summary', 'theme', 'activityType', 'userId', 'userName', 'visibility', 'createdAt']`.
   - All string fields enforce `minLength` and `maxLength` bounds matching `firebase-blueprint.json`.
   - Document IDs (`{worksheetId}`, `{logId}`) must satisfy `isValidId(id)` (`^[a-zA-Z0-9_\-]+$`, max 128 chars).
5. **Temporal Integrity**: `createdAt` must strictly equal `request.time`.
6. **Query Enforcer on `list`**:
   - `/community_worksheets`: `allow list` requires `resource.data.visibility == 'public' || (isSignedIn() && resource.data.authorId == request.auth.uid)`.
   - `/activity_logs`: `allow list` requires `isSignedIn() && (resource.data.visibility == 'public' || resource.data.userId == request.auth.uid)`.
7. **Zero PII Exposure**: Neither `CommunityWorksheet` nor `ActivityLog` stores email addresses, phone numbers, or physical addresses.

---

## 2. The "Dirty Dozen" Adversarial Payloads

1. **Unauthenticated Write**: Creating a `CommunityWorksheet` with `auth = null`.
2. **Unverified Email Spoof**: Creating a `CommunityWorksheet` where `auth.token.email_verified == false`.
3. **Identity Spoofing on Worksheet Creation**: Authenticated user `uid_A` sets `authorId: "uid_B"`.
4. **Shadow Field Injection ("Ghost Field")**: Adding `"isFeatured": true` to a `CommunityWorksheet` payload.
5. **Client Timestamp Forgery**: Passing a past/future timestamp instead of `request.time` for `createdAt`.
6. **Oversized Title DoS ("Denial of Wallet")**: Sending a 5,000-character string in `title` (`maxLength: 120`).
7. **Invalid Enum Injection**: Setting `activityType: "hacked_mode"` outside `['syllables', 'visual_math', 'matching', 'word_puzzle']`.
8. **ID Poisoning Attack**: Creating a document with a 500-character ID or special characters (`worksheet$#1`).
9. **Unauthorized Update of Another Teacher's Worksheet**: User `uid_B` attempts to update `uid_A`'s worksheet.
10. **Immutable Field Mutation**: Owner `uid_A` attempts to change `authorId` or `createdAt` during an `update`.
11. **Private Worksheet Leak on `list` / `get`**: User `uid_B` queries a worksheet with `visibility == 'private'` owned by `uid_A`.
12. **ActivityLog Tampering (`update` / `delete`)**: Attempting to modify or delete an immutable `ActivityLog` entry without admin privileges.
