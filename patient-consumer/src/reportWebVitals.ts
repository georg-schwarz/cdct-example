import { ReportHandler } from 'web-vitals';

const reportWebVitals = (onPerfEntry?: ReportHandler): Promise<void> => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    return import('web-vitals').then(
      ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        void getCLS(onPerfEntry);
        void getFID(onPerfEntry);
        void getFCP(onPerfEntry);
        void getLCP(onPerfEntry);
        void getTTFB(onPerfEntry);
      },
    );
  }
  return Promise.resolve();
};

export default reportWebVitals;
