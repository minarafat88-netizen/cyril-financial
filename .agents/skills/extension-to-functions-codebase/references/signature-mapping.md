________________________________________________________________

## Cloud Pub/Sub

| V1 Trigger                   | V2 Equivalent          | Destructuring Pattern    |
| :--------------------------- | :--------------------- | :----------------------- |
| `pubsub.topic().onPublish()` | `onMessagePublished()` | `({ message, context })` |
| `pubsub.schedule().onRun()`  | `onSchedule()`         | Access `event` directly  |

> [!NOTE] Scheduled functions moved from the `pubsub` namespace to the
> `scheduler` namespace in V2.

______________________________________________________________________

## Realtime Database

| V1 Trigger                  | V2 Equivalent      | Destructuring Pattern     |
| :-------------------------- | :----------------- | :------------------------ |
| `database.ref().onWrite()`  | `onValueWritten()` | `({ change, context })`   |
| `database.ref().onCreate()` | `onValueCreated()` | `({ snapshot, context })` |
| `database.ref().onUpdate()` | `onValueUpdated()` | `({ change, context })`   |
| `database.ref().onDelete()` | `onValueDeleted()` | `({ snapshot, context })` |

______________________________________________________________________

## Cloud Storage

| V1 Trigger                            | V2 Equivalent               | Destructuring Pattern   |
| :------------------------------------ | :-------------------------- | :---------------------- |
| `storage.object().onArchive()`        | `onObjectArchived()`        | `({ object, context })` |
| `storage.object().onDelete()`         | `onObjectDeleted()`         | `({ object, context })` |
| `storage.object().onFinalize()`       | `onObjectFinalized()`       | `({ object, context })` |
| `storage.object().onMetadataUpdate()` | `onObjectMetadataUpdated()` | `({ object, context })` |

______________________________________________________________________

## HTTP / Callables

| V1 Trigger          | V2 Equivalent       | Destructuring Pattern          |
| :------------------ | :------------------ | :----------------------------- |
| `https.onRequest()` | `https.onRequest()` | Standard Express `(req, res)`  |
| `https.onCall()`    | `https.onCall()`    | Destructure `({ data, auth })` |

> [!IMPORTANT] **HTTP Callables do NOT use the Destructuring Shim.** In V2, the
> handler receives a single `CallableRequest` object (not a `CloudEvent`). You
> should destructure properties like `data`, `auth`, and `app` directly from it.
> The traditional `context` object is **unavailable**.

______________________________________________________________________

## Auth (Blocking)

| V1 Trigger                   | V2 Equivalent                   | Destructuring Pattern   |
| :--------------------------- | :------------------------------ | :---------------------- |
| `auth.user().beforeSignIn()` | `identity.beforeUserSignedIn()` | Access `event` directly |
| `auth.user().beforeCreate()` | `identity.beforeUserCreated()`  | Access `event` directly |

> [!NOTE] Auth Blocking triggers moved to the `identity` namespace in V2.

______________________________________________________________________

## Cloud Tasks

| V1 Trigger                       | V2 Equivalent        | Destructuring Pattern   |
| :------------------------------- | :------------------- | :---------------------- |
| `tasks.taskQueue().onDispatch()` | `onTaskDispatched()` | Access `event` directly |
