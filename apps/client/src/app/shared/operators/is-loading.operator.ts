import { defer, finalize, Observable, Subject } from 'rxjs';

export const isLoading = <T>(isLoading: Subject<boolean>) => {
  return (source: Observable<T>): Observable<T> =>
    source.pipe(
      prepare(() => isLoading.next(true)),
      finalize(() => isLoading.next(false))
    );
};

const prepare = <T>(callback: () => void) => {
  return (source: Observable<T>): Observable<T> =>
    defer(() => {
      callback();
      return source;
    });
};
