export default abstract class AnimKeys {
  public static readonly Faune = {
    IdleDown: 'faune-idle-down',
    IdleUp: 'faune-idle-up',
    IdleSide: 'faune-idle-side',
    RunDown: 'faune-run-down',
    RunUp: 'faune-run-up',
    RunSide: 'faune-run-side',
    Faint: 'faune-faint'
  } as const

  public static readonly Lizard = {
    Idle: 'lizard-idle',
    Run: 'lizard-run'
  } as const
}
