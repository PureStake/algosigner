import { parseUrlServerAndPort } from "./networkUrlParser";

test('Validate empty URL', () => {
    const result = parseUrlServerAndPort('');
    expect(result["server"]).toBe("");
    expect(result["port"]).toBe("");
});

const portURLs = [
    ['https://localhost:4001','https://localhost','4001'],
    ['https://127.0.0.1:4001','https://127.0.0.1','4001'],
    ['https://::/128:4001','https://::/128','4001'],
    ['https://0:0:0:0:0:0:0:0:4001','https://0:0:0:0:0:0:0:0','4001'],
    ['https://[::]:4001','https://[::]','4001'],
    ['https://[::/128]:4001','https://[::/128]','4001'],
    ['https://[0:0:0:0:0:0:0:0]:4001','https://[::]','4001'],
    ['https://subdomain.domain.com:4001','https://subdomain.domain.com','4001'],
    ['https://subdomain.domain.com:4001/foo/bar','https://subdomain.domain.com','4001'],
    ['https://user:pass@subdomain.domain.com:4001/foo/bar?index=1&limit=10','https://user:pass@subdomain.domain.com','4001']
];
test.each(portURLs)(
    'Validate URLs with ports (%s)',
    (inputUrl, expectedServer, expectedPort) => {
        const result = parseUrlServerAndPort(inputUrl);
        expect(result["server"]).toBe(expectedServer);
        expect(result["port"]).toBe(expectedPort);
    }
);

const noPortURLs = [
    ['https://localhost','https://localhost',''],
    ['https://127.0.0.1','https://127.0.0.1',''],
    ['https://::/128','https://::/128',''],
    ['https://0:0:0:0:0:0:0:0','https://0:0:0:0:0:0:0:0',''],
    ['https://[::]','https://[::]',''],
    ['https://[::/128]','https://[::/128]',''],
    ['https://[0:0:0:0:0:0:0:0]','https://[::]',''],
    ['https://subdomain.domain.com','https://subdomain.domain.com',''],
    ['https://subdomain.domain.com/foo/bar','https://subdomain.domain.com',''],
    ['https://user:pass@subdomain.domain.com/foo/bar?index=1&limit=10','https://user:pass@subdomain.domain.com','']
];
test.each(noPortURLs)(
    'Validate URLs without ports (%s)',
    (inputUrl, expectedServer, expectedPort) => {
        const result = parseUrlServerAndPort(inputUrl);
        expect(result["server"]).toBe(expectedServer);
        expect(result["port"]).toBe(expectedPort);
    }
);

const badPortURLs = [
    ['https://localhost:i4001','https://localhost:i4001',''],
    ['https://127.0.0.1:i4001','https://127.0.0.1:i4001',''],
    ['https://subdomain.domain.com:i4001','https://subdomain.domain.com:i4001',''],
    ['https://user:pass@subdomain.domain.com:i4001/foo/bar?index=1&limit=10','https://user:pass@subdomain.domain.com:i4001/foo/bar?index=1&limit=10','']
];
test.each(badPortURLs)(
    'Validate Incorrect Ports (%s)',
    (inputUrl, expectedServer, expectedPort) => {
        const result = parseUrlServerAndPort(inputUrl);
        expect(result["server"]).toBe(expectedServer);
        expect(result["port"]).toBe(expectedPort);
    }
);

const noProtocolURLs = [
    ['localhost:4001','localhost','4001'],
    ['127.0.0.1:4001','127.0.0.1','4001'],
    ['::/128:4001','::/128','4001'],
    ['0:0:0:0:0:0:0:0:4001','0:0:0:0:0:0:0:0','4001'],
    ['[::]:4001','[::]','4001'],
    ['[::/128]:4001','[::/128]','4001'],
    ['[0:0:0:0:0:0:0:0]:4001','[0:0:0:0:0:0:0:0]','4001'],
    ['subdomain.domain.com:4001','subdomain.domain.com','4001'],
    ['subdomain.domain.com:4001/foo/bar','subdomain.domain.com','4001'],
    ['user:pass@subdomain.domain.com:4001/foo/bar?index=1&limit=10','user:pass@subdomain.domain.com','4001']
];
test.each(noProtocolURLs)(
    'Validate URLs without protocols (%s)',
    (inputUrl, expectedServer, expectedPort) => {
        const result = parseUrlServerAndPort(inputUrl);
        expect(result["server"]).toBe(expectedServer);
        expect(result["port"]).toBe(expectedPort);
    }
);