/**
 * Used to extend types of components where the history object is used
 */
export interface IHistoryProps {
  history: {
    push: (url: string) => void;
    listen: any;
  };
}
