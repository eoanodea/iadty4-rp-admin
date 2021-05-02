export interface IHistoryProps {
  history: {
    push: (url: string) => void;
    listen: any;
  };
}
