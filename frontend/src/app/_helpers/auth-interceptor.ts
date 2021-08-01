import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

	intercept(req: HttpRequest<any>,
		next: HttpHandler): Observable<HttpEvent<any>> {

		const idToken = localStorage.getItem("id");

		if (idToken) {
			const cloned = req.clone({
				headers: req.headers.set("id", idToken)
			});

			return next.handle(cloned);
		}
		else {
			return next.handle(req);
		}
	}
}
