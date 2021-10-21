export default interface SucessResponseWithContentApi<EntityType> {
  error: false;
  message: string;
  values: EntityType;
}
