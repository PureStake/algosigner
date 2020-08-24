import { ValidVersions, DefaultEncryptionParameters } from './default';

test('Validate current iteration exists in available iterations', () => {
    expect(ValidVersions).toContain(DefaultEncryptionParameters.Version);
});

