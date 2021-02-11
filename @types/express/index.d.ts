// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState } from "@lib/typedefs/application-state";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PushcutApi } from "@server/static/pushcut-api";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FluxStandardAction } from "flux-standard-action";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Store } from "redux";

declare global {
	namespace Express {
		interface Request {
			dispatchAction: <T>(action: FluxStandardAction<string, T>) => void;
			store: Store<ApplicationState>;
			pushcutApi: PushcutApi;
		}
	}
}
