export interface BookElementModel {
  id: String;
  name: String;
  link?: String;
  isFolder: boolean;
  children?: BookElementModel[];
}
